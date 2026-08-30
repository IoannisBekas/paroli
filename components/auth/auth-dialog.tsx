'use client';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  type ConfirmationResult,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  CircleUserRound,
  LoaderCircle,
  LogOut,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { type ComponentProps, useEffect, useId, useRef, useState } from 'react';

import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFirebaseAuth } from '@/lib/firebase-auth';
import { cn } from '@/lib/utils';

const authErrors: Record<string, string> = {
  'auth/account-exists-with-different-credential':
    'Υπάρχει ήδη λογαριασμός με αυτό το email και διαφορετικό τρόπο σύνδεσης.',
  'auth/credential-already-in-use':
    'Αυτό το στοιχείο χρησιμοποιείται ήδη από άλλο λογαριασμό.',
  'auth/email-already-in-use': 'Υπάρχει ήδη λογαριασμός με αυτό το email.',
  'auth/invalid-credential': 'Το email ή ο κωδικός δεν είναι σωστά.',
  'auth/invalid-email': 'Έλεγξε τη διεύθυνση email.',
  'auth/invalid-phone-number':
    'Γράψε το κινητό σε διεθνή μορφή, π.χ. +3069XXXXXXXX.',
  'auth/invalid-verification-code': 'Ο κωδικός SMS δεν είναι σωστός.',
  'auth/operation-not-allowed':
    'Αυτός ο τρόπος σύνδεσης δεν έχει ενεργοποιηθεί ακόμη.',
  'auth/popup-blocked': 'Το παράθυρο σύνδεσης μπλοκαρίστηκε από τον browser.',
  'auth/popup-closed-by-user': 'Η σύνδεση ακυρώθηκε πριν ολοκληρωθεί.',
  'auth/quota-exceeded': 'Το όριο αποστολής SMS εξαντλήθηκε προσωρινά.',
  'auth/too-many-requests':
    'Έγιναν πολλές προσπάθειες. Δοκίμασε ξανά αργότερα.',
  'auth/unauthorized-domain':
    'Το domain του site δεν έχει εγκριθεί στο Firebase.',
  'auth/weak-password': 'Ο κωδικός χρειάζεται τουλάχιστον 8 χαρακτήρες.',
};

function createAuthError(code: string) {
  return Object.assign(new Error(code), { code });
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

function getAuthError(error: unknown) {
  const code =
    typeof error === 'object' && error && 'code' in error
      ? String((error as { code: unknown }).code)
      : '';
  return authErrors[code] ?? 'Κάτι πήγε στραβά. Δοκίμασε ξανά.';
}

export function AuthDialog({ className }: { className?: string }) {
  const { configured, loading, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [emailMode, setEmailMode] = useState<'register' | 'signin'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('+30');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'code'>('phone');
  const [verificationCode, setVerificationCode] = useState('');
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaId = `paroli-recaptcha-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(
    () => () => {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    },
    [],
  );

  const resetFeedback = () => {
    setError('');
    setNotice('');
  };

  const runAuthAction = async (action: () => Promise<void>) => {
    resetFeedback();
    setBusy(true);
    try {
      await action();
    } catch (actionError) {
      setError(getAuthError(actionError));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = () =>
    runAuthAction(async () => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error('Firebase is not configured');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    });

  const handleEmail: FormSubmitHandler = (event) => {
    event.preventDefault();
    void runAuthAction(async () => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error('Firebase is not configured');

      if (emailMode === 'register') {
        if (password.length < 8) throw createAuthError('auth/weak-password');
        if (password !== confirmPassword) {
          setError('Οι δύο κωδικοί δεν ταιριάζουν.');
          return;
        }
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
        await sendEmailVerification(credential.user);
        setPassword('');
        setConfirmPassword('');
        setNotice('Ο λογαριασμός δημιουργήθηκε. Στείλαμε email επιβεβαίωσης.');
        return;
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
      setConfirmPassword('');
    });
  };

  const clearRecaptcha = () => {
    recaptchaRef.current?.clear();
    recaptchaRef.current = null;
  };

  const handleSendCode: FormSubmitHandler = (event) => {
    event.preventDefault();
    void runAuthAction(async () => {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error('Firebase is not configured');
      clearRecaptcha();
      const verifier = new RecaptchaVerifier(auth, recaptchaId, {
        size: 'invisible',
      });
      recaptchaRef.current = verifier;

      try {
        confirmationRef.current = await signInWithPhoneNumber(
          auth,
          phone.replace(/[\s()-]/g, ''),
          verifier,
        );
        setPhoneStep('code');
        setNotice('Στείλαμε έναν εξαψήφιο κωδικό με SMS.');
      } catch (sendError) {
        clearRecaptcha();
        throw sendError;
      }
    });
  };

  const handleVerifyCode: FormSubmitHandler = (event) => {
    event.preventDefault();
    void runAuthAction(async () => {
      if (!confirmationRef.current)
        throw new Error('Missing phone confirmation');
      await confirmationRef.current.confirm(verificationCode);
      confirmationRef.current = null;
      clearRecaptcha();
      setPhone('+30');
      setPhoneStep('phone');
      setVerificationCode('');
      setNotice('Το κινητό επιβεβαιώθηκε και ο λογαριασμός είναι έτοιμος.');
    });
  };

  const handleSignOut = () =>
    runAuthAction(async () => {
      const auth = getFirebaseAuth();
      if (!auth) return;
      await signOut(auth);
      setNotice('Αποσυνδέθηκες επιτυχώς.');
    });

  const resetPhone = () => {
    confirmationRef.current = null;
    clearRecaptcha();
    setPhoneStep('phone');
    setVerificationCode('');
    resetFeedback();
  };

  const identity =
    user?.displayName ||
    user?.email ||
    user?.phoneNumber ||
    'Ο λογαριασμός μου';

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          'min-h-11 rounded-full border-black/10 bg-card px-4 font-black shadow-none',
          className,
        )}
        aria-label={user ? `Λογαριασμός: ${identity}` : 'Εγγραφή ή σύνδεση'}
      >
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <CircleUserRound />
        )}
        <span className="truncate">{user ? identity : 'Σύνδεση'}</span>
      </Button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            resetFeedback();
            setPassword('');
            setConfirmPassword('');
          }
        }}
      >
        <DialogContent className="flex max-h-[calc(100dvh-1rem)] flex-col gap-0 overflow-hidden rounded-[1.25rem] p-0 sm:max-h-[92dvh] sm:max-w-md sm:rounded-[1.5rem]">
          <div className="shrink-0 border-b border-black/10 bg-ink p-5 text-white sm:p-7">
            <DialogHeader>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-sun">
                Λογαριασμός Πάρολι
              </p>
              <DialogTitle className="pr-10 text-2xl font-black tracking-tight sm:text-3xl">
                {user ? 'Καλώς ήρθες!' : 'Εγγραφή ή σύνδεση'}
              </DialogTitle>
              <DialogDescription className="text-white/65">
                {user
                  ? 'Τα στοιχεία σου μπορούν να χρησιμοποιηθούν για γρηγορότερο checkout.'
                  : 'Διάλεξε Google, email ή κινητό.'}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7">
            {!configured ? (
              <div className="rounded-2xl border border-sun/60 bg-sun/15 p-5">
                <ShieldAlert className="size-8 text-primary" />
                <h3 className="mt-4 text-lg font-black">
                  Η υποδομή είναι έτοιμη για σύνδεση
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  Απομένει να συνδεθεί το Firebase project με το GitHub για να
                  ενεργοποιηθούν οι πραγματικές εγγραφές.
                </p>
              </div>
            ) : user ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-black/10 bg-muted/60 p-5">
                  <span className="grid size-12 place-items-center rounded-full bg-olive text-white">
                    <ShieldCheck />
                  </span>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                    Συνδεδεμένος λογαριασμός
                  </p>
                  <p className="mt-1 break-words text-lg font-black">
                    {identity}
                  </p>
                  {user.email && !user.emailVerified && (
                    <p className="mt-3 rounded-lg bg-sun/20 px-3 py-2 text-xs font-bold leading-5">
                      Έλεγξε το email σου για να ολοκληρώσεις την επιβεβαίωση.
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={busy}
                  className="h-12 w-full rounded-full font-black"
                >
                  <LogOut /> Αποσύνδεση
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogle}
                  disabled={busy}
                  className="h-12 w-full rounded-full border-black/15 bg-background text-sm font-black"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-white text-base font-black text-[#4285f4] shadow-sm">
                    G
                  </span>
                  Συνέχεια με Google
                </Button>

                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="h-px flex-1 bg-black/10" />ή
                  <span className="h-px flex-1 bg-black/10" />
                </div>

                <Tabs defaultValue="email" className="gap-5">
                  <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl">
                    <TabsTrigger
                      value="email"
                      className="h-full rounded-lg font-black"
                    >
                      <Mail /> Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="phone"
                      className="h-full rounded-lg font-black"
                    >
                      <Smartphone /> Κινητό
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email">
                    <form onSubmit={handleEmail} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${recaptchaId}-email`}>Email</Label>
                        <Input
                          id={`${recaptchaId}-email`}
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          autoComplete="email"
                          required
                          className="h-11 bg-background"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${recaptchaId}-password`}>
                          Κωδικός
                        </Label>
                        <Input
                          id={`${recaptchaId}-password`}
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          autoComplete={
                            emailMode === 'register'
                              ? 'new-password'
                              : 'current-password'
                          }
                          required
                          minLength={8}
                          className="h-11 bg-background"
                          placeholder="Τουλάχιστον 8 χαρακτήρες"
                        />
                      </div>
                      {emailMode === 'register' && (
                        <div className="space-y-2">
                          <Label htmlFor={`${recaptchaId}-confirm-password`}>
                            Επανάληψη κωδικού
                          </Label>
                          <Input
                            id={`${recaptchaId}-confirm-password`}
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            required
                            minLength={8}
                            className="h-11 bg-background"
                          />
                        </div>
                      )}
                      <Button
                        type="submit"
                        disabled={busy}
                        className="h-12 w-full rounded-full bg-primary font-black text-white"
                      >
                        {busy && <LoaderCircle className="animate-spin" />}
                        {emailMode === 'register'
                          ? 'Δημιουργία λογαριασμού'
                          : 'Σύνδεση με email'}
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailMode((mode) =>
                            mode === 'register' ? 'signin' : 'register',
                          );
                          resetFeedback();
                        }}
                        className="min-h-11 w-full text-sm font-black text-primary underline underline-offset-4"
                      >
                        {emailMode === 'register'
                          ? 'Έχω ήδη λογαριασμό'
                          : 'Θέλω να κάνω εγγραφή'}
                      </button>
                    </form>
                  </TabsContent>

                  <TabsContent value="phone">
                    {phoneStep === 'phone' ? (
                      <form onSubmit={handleSendCode} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${recaptchaId}-phone`}>
                            Κινητό τηλέφωνο
                          </Label>
                          <Input
                            id={`${recaptchaId}-phone`}
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            className="h-11 bg-background"
                            placeholder="+3069XXXXXXXX"
                          />
                        </div>
                        <div id={recaptchaId} />
                        <p className="text-xs font-semibold leading-5 text-muted-foreground">
                          Θα σταλεί SMS επιβεβαίωσης. Ο αριθμός διαβιβάζεται στη
                          Google/Firebase για ασφάλεια και αποτροπή κατάχρησης·
                          ενδέχεται να ισχύουν χρεώσεις SMS.
                        </p>
                        <Button
                          type="submit"
                          disabled={busy}
                          className="h-12 w-full rounded-full bg-primary font-black text-white"
                        >
                          {busy && <LoaderCircle className="animate-spin" />}
                          Αποστολή κωδικού SMS
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyCode} className="space-y-5">
                        <div className="text-center">
                          <p className="text-sm font-black">
                            Κωδικός για {phone}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Γράψε τα 6 ψηφία του SMS.
                          </p>
                        </div>
                        <InputOTP
                          maxLength={6}
                          value={verificationCode}
                          onChange={setVerificationCode}
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          containerClassName="justify-center"
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }, (_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="size-11 sm:size-12"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        <Button
                          type="submit"
                          disabled={busy || verificationCode.length !== 6}
                          className="h-12 w-full rounded-full bg-primary font-black text-white"
                        >
                          {busy && <LoaderCircle className="animate-spin" />}
                          Επιβεβαίωση κινητού
                        </Button>
                        <button
                          type="button"
                          onClick={resetPhone}
                          className="min-h-11 w-full text-sm font-black text-primary underline underline-offset-4"
                        >
                          Αλλαγή αριθμού
                        </button>
                      </form>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {(error || notice) && (
              <p
                className={cn(
                  'mt-5 rounded-xl px-4 py-3 text-sm font-bold leading-6',
                  error
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-olive/10 text-olive',
                )}
                role={error ? 'alert' : 'status'}
              >
                {error || notice}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
