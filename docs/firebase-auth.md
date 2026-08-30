# Firebase Authentication setup

Το site υποστηρίζει Google, email/password και κινητό με SMS OTP μέσω Firebase Authentication.

## Firebase Console

1. Δημιούργησε Firebase project και πρόσθεσε Web App.
2. Στο **Authentication → Sign-in method** ενεργοποίησε:
   - Google
   - Email/Password
   - Phone
3. Στο **Authentication → Settings → Authorized domains** πρόσθεσε `ioannisbekas.github.io`.
4. Στο **SMS region policy** επίτρεψε την Ελλάδα.
5. Για πραγματικά SMS σύνδεσε το project με Blaze billing. Τα SMS χρεώνονται ανά αποστολή.
6. Για δοκιμές χρησιμοποίησε fictional phone numbers από το Firebase Console ώστε να μη στέλνονται πραγματικά SMS.

## GitHub Actions variables

Αντέγραψε το public Firebase web config στις παρακάτω repository variables:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MESSAGING_SENDER_ID`

Παράδειγμα με GitHub CLI:

```powershell
gh variable set FIREBASE_API_KEY --repo IoannisBekas/paroli --body "..."
gh variable set FIREBASE_AUTH_DOMAIN --repo IoannisBekas/paroli --body "PROJECT_ID.firebaseapp.com"
gh variable set FIREBASE_PROJECT_ID --repo IoannisBekas/paroli --body "..."
gh variable set FIREBASE_APP_ID --repo IoannisBekas/paroli --body "..."
gh variable set FIREBASE_MESSAGING_SENDER_ID --repo IoannisBekas/paroli --body "..."
```

Το Firebase web config είναι δημόσιο project configuration, όχι server secret. Πριν αποθηκευτούν δεδομένα πελατών σε Firestore, χρειάζονται αυστηρά Security Rules και backend έλεγχος του Firebase ID token για κάθε παραγγελία.

## Account linking

Google, email και κινητό μπορούν να αντιστοιχούν στο ίδιο άτομο. Πριν το production launch πρέπει να προστεθεί ελεγχόμενη ροή account linking, ώστε ένας πελάτης να μην αποκτά διαφορετικό Firebase UID ανά μέθοδο σύνδεσης.
