'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { menuCategories, menuItems, type MenuItem } from '@/lib/menu';

const brandLogo = 'https://imageproxy.wolt.com/assets/694070c81ed68ef1db2c5081';
const heroImage =
  'https://cdn.e-food.gr/cdn-cgi/image/f=auto/shop/2551990/cover?t=1783668730&platform=web';

const branches = [
  {
    id: 'nikaia',
    name: 'Νίκαια',
    address: 'Πέτρου Ράλλη 158',
    phone: '210 494 5400',
    phoneLink: '2104945400',
    eta: '25–30′',
  },
  {
    id: 'pasalimani',
    name: 'Πασαλιμάνι',
    address: 'Ακτή Μουτσοπούλου 10',
    phone: '210 418 0070',
    phoneLink: '2104180070',
    eta: 'με επιβεβαίωση',
  },
  {
    id: 'drapetsona',
    name: 'Δραπετσώνα',
    address: 'Αγίου Δημητρίου 42',
    phone: '210 462 7600',
    phoneLink: '2104627600',
    eta: 'με επιβεβαίωση',
  },
] as const;

type BranchId = (typeof branches)[number]['id'];

type SizeOption = {
  id: string;
  label: string;
  priceLabel: string;
};

type CartLine = {
  key: string;
  itemId: string;
  name: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
  optionIds: string[];
  options: string[];
};

type OrderResult = {
  orderNumber: string;
  total: number;
  eta: string;
};

const ingredients = ['Πατάτες', 'Ντομάτα', 'Κρεμμύδι', 'Ανάμεικτη σαλάτα'];
const sauces = ['Τζατζίκι', 'Σως Παρόλι', 'Γιαούρτι Παρόλι', 'Μουστάρδα Παρόλι'];
const extras = [
  { id: 'extra_gouda', label: 'Gouda', price: 0.5 },
  { id: 'extra_feta', label: 'Φέτα', price: 0.5 },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(value);

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('el');

function getSizeOptions(item: MenuItem): SizeOption[] {
  if (item.category === 'Τυλιχτά') {
    return [
      { id: 'traditional', label: 'Παραδοσιακή πίτα', priceLabel: 'στην τιμή' },
      { id: 'wholegrain', label: 'Πίτα ολικής', priceLabel: 'στην τιμή' },
      { id: 'corn', label: 'Πίτα καλαμποκιού', priceLabel: 'στην τιμή' },
      { id: 'cypriot', label: 'Κυπριακή / αραβική', priceLabel: '+0,40€' },
      { id: 'giant_pita', label: 'Γίγας 30cm', priceLabel: '+3,90€' },
    ];
  }

  if (item.category === 'Σάντουιτς καντίνας') {
    return [
      { id: 'standard', label: 'Καντίνας 25cm', priceLabel: 'στην τιμή' },
      { id: 'giant_sandwich', label: 'Γίγας 38cm', priceLabel: '+2,00€' },
    ];
  }

  if (item.category === 'Σκεπαστές') {
    return [
      { id: 'standard', label: 'Κανονική', priceLabel: 'στην τιμή' },
      { id: 'giant_skepasti', label: 'Γίγας', priceLabel: '+6,70€' },
    ];
  }

  if (item.category === 'Το κιλό') {
    return [
      { id: 'half_kilo', label: '500gr', priceLabel: formatPrice(item.price / 2) },
      { id: 'one_kilo', label: '1 κιλό', priceLabel: formatPrice(item.price) },
    ];
  }

  return [{ id: 'standard', label: 'Κανονικό', priceLabel: 'στην τιμή' }];
}

function getConfiguredPrice(item: MenuItem, sizeId: string, extraIds: string[]) {
  let price = sizeId === 'half_kilo' ? item.price / 2 : item.price;
  if (sizeId === 'cypriot') price += 0.4;
  if (sizeId === 'giant_pita') price += 3.9;
  if (sizeId === 'giant_sandwich') price += 2;
  if (sizeId === 'giant_skepasti') price += 6.7;
  price += extraIds.length * 0.5;
  return Math.round(price * 100) / 100;
}

export default function Home() {
  const [branchId, setBranchId] = useState<BranchId>('nikaia');
  const [activeCategory, setActiveCategory] = useState<string>('Δημοφιλέστερα');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState('standard');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(ingredients);
  const [selectedSauce, setSelectedSauce] = useState(sauces[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  const branch = branches.find((item) => item.id === branchId) ?? branches[0];
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const minimumRemaining = Math.max(0, 6 - cartTotal);

  const visibleItems = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());

    if (normalizedQuery) {
      return menuItems.filter((item) =>
        normalizeText(item.name + ' ' + item.description + ' ' + item.category).includes(
          normalizedQuery,
        ),
      );
    }

    if (activeCategory === 'Δημοφιλέστερα') {
      return menuItems.filter((item) => item.popular);
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, query]);

  const openProduct = (item: MenuItem) => {
    if (!item.hasOptions) {
      addCartLine(item, item.price, [], []);
      return;
    }

    const firstSize = getSizeOptions(item)[0]?.id ?? 'standard';
    setSelectedProduct(item);
    setSelectedSize(firstSize);
    setSelectedIngredients(ingredients);
    setSelectedSauce(sauces[0]);
    setSelectedExtras([]);
    setProductQuantity(1);
  };

  const addCartLine = (
    item: MenuItem,
    unitPrice: number,
    optionIds: string[],
    options: string[],
    quantity = 1,
  ) => {
    const key = [item.id, ...optionIds, ...options].join('|');
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [
        ...current,
        {
          key,
          itemId: item.id,
          name: item.name,
          image: item.image,
          unitPrice,
          quantity,
          optionIds,
          options,
        },
      ];
    });
  };

  const addConfiguredProduct = () => {
    if (!selectedProduct) return;
    const size = getSizeOptions(selectedProduct).find((item) => item.id === selectedSize);
    const optionIds = [
      ...(selectedSize !== 'standard' && selectedSize !== 'traditional'
        ? [selectedSize]
        : []),
      ...selectedExtras,
    ];
    const optionLabels = [
      ...(size ? [size.label] : []),
      ...(selectedProduct.category !== 'Το κιλό'
        ? [
            'Με: ' + (selectedIngredients.length ? selectedIngredients.join(', ') : 'χωρίς υλικά'),
            'Σως: ' + selectedSauce,
          ]
        : []),
      ...extras
        .filter((extra) => selectedExtras.includes(extra.id))
        .map((extra) => 'Extra ' + extra.label),
    ];
    const unitPrice = getConfiguredPrice(selectedProduct, selectedSize, selectedExtras);
    addCartLine(selectedProduct, unitPrice, optionIds, optionLabels, productQuantity);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const updateCartQuantity = (key: string, amount: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, quantity: Math.max(0, line.quantity + amount) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const goToCheckout = () => {
    if (minimumRemaining > 0) return;
    setCartOpen(false);
    setOrderResult(null);
    setCheckoutError('');
    setCheckoutOpen(true);
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptedTerms || cart.length === 0) return;

    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setCheckoutError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branch: branchId,
          customerName: form.get('customerName'),
          phone: form.get('phone'),
          address: form.get('address'),
          floorBell: form.get('floorBell'),
          notes: form.get('notes'),
          paymentMethod: 'cash',
          lines: cart.map((line) => ({
            itemId: line.itemId,
            quantity: line.quantity,
            optionIds: line.optionIds,
            options: line.options,
          })),
        }),
      });

      const result = (await response.json()) as OrderResult & { message?: string };
      if (!response.ok) throw new Error(result.message || 'Η παραγγελία δεν ολοκληρώθηκε.');

      setOrderResult(result);
      setCart([]);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : 'Κάτι πήγε στραβά. Δοκίμασε ξανά.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sizeOptions = selectedProduct ? getSizeOptions(selectedProduct) : [];
  const configuredUnitPrice = selectedProduct
    ? getConfiguredPrice(selectedProduct, selectedSize, selectedExtras)
    : 0;
  const showBuildOptions = selectedProduct?.category !== 'Το κιλό';

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Παρόλι, αρχική">
            <img
              src={brandLogo}
              alt=""
              className="size-12 rounded-full bg-primary object-cover shadow-[3px_3px_0_#1d1b19]"
            />
            <div>
              <span className="block text-xl font-black leading-none tracking-[-0.05em]">ΠΑΡΟΛΙ</span>
              <span className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.17em] text-muted-foreground sm:block">
                Ψητοπωλείο • Γυράδικο
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-black lg:flex" aria-label="Κύρια πλοήγηση">
            <a className="transition-colors hover:text-primary" href="#menu">Μενού</a>
            <a className="transition-colors hover:text-primary" href="#stores">Καταστήματα</a>
            <a className="transition-colors hover:text-primary" href="#about">Το Παρόλι</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Άνοιγμα μενού"
              aria-expanded={mobileMenuOpen}
            >
              <Menu />
            </Button>
            <Button
              onClick={() => setCartOpen(true)}
              className="h-11 rounded-full bg-ink px-4 text-sm font-black text-white hover:bg-ink/85 sm:px-5"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Καλάθι</span>
              <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-white">
                {cartCount}
              </span>
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-black/10 px-5 py-4 lg:hidden" aria-label="Μενού κινητού">
            <div className="mx-auto flex max-w-[1440px] gap-6 text-sm font-black">
              <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Μενού</a>
              <a href="#stores" onClick={() => setMobileMenuOpen(false)}>Καταστήματα</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>Το Παρόλι</a>
            </div>
          </nav>
        )}
      </header>

      <section id="top" className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-10 lg:pt-8">
        <div className="hero-grid overflow-hidden rounded-[1.75rem] bg-ink text-white sm:rounded-[2.25rem]">
          <div className="relative z-10 flex min-h-[400px] flex-col justify-between p-7 sm:p-10 lg:min-h-[480px] lg:p-14">
            <div className="flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.14em]">
              <span className="rounded-full bg-primary px-4 py-2 text-white">Παράγγειλε απευθείας</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Χωρίς marketplace</span>
            </div>
            <div className="max-w-3xl">
              <p className="mb-4 font-serif text-xl italic text-sun sm:text-2xl">
                Παραδοσιακά προϊόντα — μοντέρνα άποψη.
              </p>
              <h1 className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[5.8rem]">
                Η πείνα σου,<br />έγινε Παρόλι.
              </h1>
              <p className="mt-6 max-w-xl text-sm font-semibold leading-6 text-white/70 sm:text-base">
                Ζουμερός γύρος, χειροποίητα καλαμάκια και οι γεύσεις που αγαπάς,
                κατευθείαν από τη σχάρα μας στην πόρτα σου.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => document.getElementById('menu')?.scrollIntoView()}
                  className="h-14 rounded-full bg-primary px-7 text-base font-black text-white shadow-[0_7px_0_#871f24] hover:bg-primary/90 active:translate-y-1 active:shadow-none"
                >
                  Δες το μενού <ChevronDown className="size-5" />
                </Button>
                <a
                  href={'tel:' + branch.phoneLink}
                  className="flex h-14 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-black transition hover:bg-white/10"
                >
                  <Phone className="size-4 text-sun" /> {branch.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
            <img
              src={heroImage}
              alt="Τυλιχτά, καλαμάκια και πατάτες από το Παρόλι"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/35 lg:to-transparent" />
            <div className="absolute bottom-6 right-6 rounded-2xl bg-sun px-5 py-4 text-ink shadow-xl sm:bottom-8 sm:right-8">
              <div className="flex items-center gap-1 text-sm font-black">
                <Star className="size-4 fill-current" /> 4.8 / 5
              </div>
              <p className="mt-1 text-xs font-bold opacity-70">4.391 αξιολογήσεις Νίκαιας</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-3 -mt-5 grid overflow-hidden rounded-2xl border border-black/10 bg-card shadow-[0_18px_60px_rgb(38_28_18/12%)] sm:mx-8 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="border-b border-black/10 p-5 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-primary">Παραγγελία από</p>
            <p className="mt-1 text-lg font-black">{branch.name} · {branch.address}</p>
          </div>
          <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4 lg:border-b-0 lg:border-r">
            <Clock3 className="size-5 text-primary" />
            <div><p className="text-xs font-bold text-muted-foreground">Χρόνος</p><p className="font-black">{branch.eta}</p></div>
          </div>
          <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4 lg:border-b-0 lg:border-r">
            <ShoppingBag className="size-5 text-primary" />
            <div><p className="text-xs font-bold text-muted-foreground">Ελάχιστη</p><p className="font-black">6,00€</p></div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="size-3 rounded-full bg-olive shadow-[0_0_0_5px_rgb(98_115_62/12%)]" />
            <div><p className="text-xs font-bold text-muted-foreground">Ωράριο delivery</p><p className="font-black">12:00–01:00</p></div>
          </div>
        </div>
      </section>

      <section id="stores" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Διάλεξε κατάστημα</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Ποιο Παρόλι είναι κοντά σου;</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm font-medium leading-6 text-muted-foreground md:block">
            Η παραγγελία σου πηγαίνει απευθείας στο κατάστημα που θα επιλέξεις.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {branches.map((item) => (
            <button
              key={item.id}
              onClick={() => setBranchId(item.id)}
              className={cn(
                'group flex items-center justify-between rounded-2xl border p-5 text-left transition',
                branchId === item.id
                  ? 'border-primary bg-primary text-white shadow-[0_8px_0_#871f24]'
                  : 'border-black/10 bg-card hover:-translate-y-0.5 hover:border-primary/40',
              )}
            >
              <div>
                <span className="text-lg font-black">{item.name}</span>
                <span className={cn('mt-1 block text-sm font-semibold', branchId === item.id ? 'text-white/75' : 'text-muted-foreground')}>
                  {item.address}
                </span>
              </div>
              <span className={cn('grid size-9 place-items-center rounded-full', branchId === item.id ? 'bg-white text-primary' : 'bg-muted text-primary')}>
                {branchId === item.id ? <Check className="size-5" /> : <MapPin className="size-5" />}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="menu" className="border-y border-black/10 bg-[#f7efdf]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Η σχάρα είναι αναμμένη</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Διάλεξε τη λιγούρα σου</h2>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Αναζήτησε γύρο, κεμπάπ, σαλάτα…"
                aria-label="Αναζήτηση στο μενού"
                className="h-12 rounded-full border-black/10 bg-card pl-11 pr-4 text-sm font-semibold shadow-sm"
              />
            </div>
          </div>

          <nav className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10" aria-label="Κατηγορίες μενού">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setQuery('');
                }}
                className={cn(
                  'shrink-0 rounded-full border px-5 py-3 text-sm font-black transition',
                  activeCategory === category && !query
                    ? 'border-ink bg-ink text-white'
                    : 'border-black/10 bg-card hover:border-primary/40 hover:text-primary',
                )}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-black">{query ? 'Αποτελέσματα αναζήτησης' : activeCategory}</h3>
            <span className="text-sm font-bold text-muted-foreground">{visibleItems.length} επιλογές</span>
          </div>

          {visibleItems.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="group grid min-h-[190px] grid-cols-[minmax(0,1fr)_128px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-card shadow-[0_8px_30px_rgb(44_32_20/5%)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgb(44_32_20/10%)] sm:grid-cols-[minmax(0,1fr)_190px]"
                >
                  <div className="flex flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.popular && (
                          <span className="rounded-full bg-sun px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-ink">
                            Δημοφιλές
                          </span>
                        )}
                        {item.hasOptions && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-primary">
                            Επιλογές
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 text-lg font-black leading-tight tracking-[-0.02em] sm:text-xl">{item.name}</h4>
                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-muted-foreground">{item.description || 'Γεύση Παρόλι, φτιαγμένη τη στιγμή που την παραγγέλνεις.'}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        {item.hasOptions && <span className="block text-[10px] font-black uppercase tracking-wide text-muted-foreground">Από</span>}
                        <span className="text-xl font-black">{formatPrice(item.price)}</span>
                      </div>
                      <Button
                        onClick={() => openProduct(item)}
                        className="rounded-full bg-primary px-4 font-black text-white hover:bg-primary/85"
                        aria-label={(item.hasOptions ? 'Επιλογές για ' : 'Προσθήκη ') + item.name}
                      >
                        {item.hasOptions ? 'Επιλογή' : 'Προσθήκη'} <Plus />
                      </Button>
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-muted">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full place-items-center bg-ink">
                        <img src={brandLogo} alt="" className="size-20 rounded-full object-cover opacity-90" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5" />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-black/20 bg-card px-6 py-16 text-center">
              <Search className="mx-auto size-9 text-primary" />
              <p className="mt-4 text-lg font-black">Δεν βρήκαμε αυτή τη λιγούρα.</p>
              <p className="mt-2 text-sm text-muted-foreground">Δοκίμασε άλλη λέξη ή διάλεξε μια κατηγορία.</p>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid overflow-hidden rounded-[2rem] bg-primary text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="font-serif text-xl italic text-sun">Από εμάς, κατευθείαν σε εσένα.</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">
              Η γεύση της γειτονιάς, χωρίς ενδιάμεσους.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-white/80">
              Παραγγέλνεις από το Παρόλι, η κουζίνα βλέπει την παραγγελία σου και το κατάστημα
              σε καλεί για επιβεβαίωση. Απλά, άμεσα και ανθρώπινα.
            </p>
          </div>
          <div className="grid gap-px bg-white/20 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {branches.map((item) => (
              <div key={item.id} className="flex flex-col justify-between bg-ink p-7">
                <div>
                  <MapPin className="size-6 text-sun" />
                  <h3 className="mt-5 text-xl font-black">{item.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/60">{item.address}</p>
                </div>
                <a href={'tel:' + item.phoneLink} className="mt-7 flex items-center gap-2 text-sm font-black text-sun">
                  <Phone className="size-4" /> {item.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <img src={brandLogo} alt="" className="size-12 rounded-full object-cover" />
            <div><p className="text-lg font-black">ΠΑΡΟΛΙ</p><p className="text-xs font-bold text-white/50">Ψητοπωλείο • Γυράδικο</p></div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-black">
            <a href="https://www.instagram.com/paroli_souvlaki/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sun">Instagram <ExternalLink className="size-3" /></a>
            <a href="https://www.tiktok.com/@paroli_souvlaki" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sun">TikTok <ExternalLink className="size-3" /></a>
            <a href="#menu" className="hover:text-sun">Μενού</a>
          </div>
          <p className="text-xs font-semibold text-white/40">© 2026 Παρόλι</p>
        </div>
      </footer>

      <Dialog open={Boolean(selectedProduct)} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-[1.5rem] p-0" showCloseButton>
          {selectedProduct && (
            <>
              <div className="relative h-52 overflow-hidden rounded-t-[1.5rem] bg-muted">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center bg-ink"><img src={brandLogo} alt="" className="size-24 rounded-full" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute bottom-4 left-5 rounded-full bg-sun px-3 py-1 text-xs font-black text-ink">
                  Από {formatPrice(selectedProduct.price)}
                </span>
              </div>
              <div className="space-y-6 p-5 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="pr-8 text-2xl font-black tracking-tight">{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="leading-6">{selectedProduct.description}</DialogDescription>
                </DialogHeader>

                <fieldset>
                  <legend className="mb-3 text-sm font-black">Μέγεθος / βάση</legend>
                  <div className="grid gap-2">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedSize(option.id)}
                        className={cn(
                          'flex items-center justify-between rounded-xl border p-3 text-left text-sm font-bold transition',
                          selectedSize === option.id ? 'border-primary bg-primary/5 ring-2 ring-primary/15' : 'border-black/10 hover:border-primary/35',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className={cn('grid size-5 place-items-center rounded-full border', selectedSize === option.id ? 'border-primary bg-primary text-white' : 'border-black/20')}>
                            {selectedSize === option.id && <Check className="size-3" />}
                          </span>
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{option.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {showBuildOptions && (
                  <>
                    <fieldset>
                      <legend className="mb-3 text-sm font-black">Υλικά</legend>
                      <div className="grid grid-cols-2 gap-3">
                        {ingredients.map((ingredient) => (
                          <Label key={ingredient} className="rounded-xl border border-black/10 p-3 font-bold">
                            <Checkbox
                              checked={selectedIngredients.includes(ingredient)}
                              onCheckedChange={(checked) =>
                                setSelectedIngredients((current) =>
                                  checked
                                    ? Array.from(new Set([...current, ingredient]))
                                    : current.filter((item) => item !== ingredient),
                                )
                              }
                            />
                            {ingredient}
                          </Label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="mb-3 text-sm font-black">Σως <span className="font-semibold text-muted-foreground">· 1 δωρεάν</span></legend>
                      <div className="flex flex-wrap gap-2">
                        {sauces.map((sauce) => (
                          <button
                            key={sauce}
                            type="button"
                            onClick={() => setSelectedSauce(sauce)}
                            className={cn(
                              'rounded-full border px-4 py-2 text-sm font-bold',
                              selectedSauce === sauce ? 'border-primary bg-primary text-white' : 'border-black/10',
                            )}
                          >
                            {sauce}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="mb-3 text-sm font-black">Extra</legend>
                      <div className="grid grid-cols-2 gap-3">
                        {extras.map((extra) => (
                          <Label key={extra.id} className="justify-between rounded-xl border border-black/10 p-3 font-bold">
                            <span className="flex items-center gap-2">
                              <Checkbox
                                checked={selectedExtras.includes(extra.id)}
                                onCheckedChange={(checked) =>
                                  setSelectedExtras((current) =>
                                    checked
                                      ? Array.from(new Set([...current, extra.id]))
                                      : current.filter((item) => item !== extra.id),
                                  )
                                }
                              />
                              {extra.label}
                            </span>
                            <span className="text-xs text-muted-foreground">+{formatPrice(extra.price)}</span>
                          </Label>
                        ))}
                      </div>
                    </fieldset>
                  </>
                )}

                <div className="flex items-center gap-3 border-t border-black/10 pt-5">
                  <div className="flex h-12 items-center gap-2 rounded-full bg-muted p-1">
                    <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setProductQuantity((value) => Math.max(1, value - 1))} aria-label="Μείωση ποσότητας"><Minus /></Button>
                    <span className="min-w-6 text-center font-black">{productQuantity}</span>
                    <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setProductQuantity((value) => Math.min(20, value + 1))} aria-label="Αύξηση ποσότητας"><Plus /></Button>
                  </div>
                  <Button onClick={addConfiguredProduct} className="h-12 flex-1 justify-between rounded-full bg-primary px-5 text-base font-black text-white hover:bg-primary/85">
                    <span>Προσθήκη</span>
                    <span>{formatPrice(configuredUnitPrice * productQuantity)}</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full gap-0 bg-card sm:max-w-[460px]">
          <SheetHeader className="border-b border-black/10 p-6">
            <SheetTitle className="flex items-center justify-between pr-8 text-2xl font-black">
              <span>Το καλάθι σου</span>
              <span className="grid size-8 place-items-center rounded-full bg-sun text-sm text-ink">{cartCount}</span>
            </SheetTitle>
            <SheetDescription>{branch.name} · {branch.address}</SheetDescription>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="grid flex-1 place-items-center p-8 text-center">
              <div>
                <ShoppingBag className="mx-auto size-11 text-primary" />
                <p className="mt-4 text-lg font-black">Εδώ θα μπει η λιγούρα σου.</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Πρόσθεσε κάτι από το μενού για να ξεκινήσεις.</p>
                <Button onClick={() => setCartOpen(false)} className="mt-5 rounded-full bg-primary px-5 font-black text-white">Πίσω στο μενού</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {cart.map((line) => (
                  <article key={line.key} className="rounded-2xl border border-black/10 bg-background p-4">
                    <div className="flex gap-3">
                      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        {line.image ? <img src={line.image} alt="" className="h-full w-full object-cover" /> : <img src={brandLogo} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-black leading-tight">{line.name}</h3>
                          <button onClick={() => updateCartQuantity(line.key, -line.quantity)} className="text-muted-foreground hover:text-destructive" aria-label={'Αφαίρεση ' + line.name}><Trash2 className="size-4" /></button>
                        </div>
                        {line.options.length > 0 && <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{line.options.join(' · ')}</p>}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full bg-muted p-0.5">
                            <Button variant="ghost" size="icon-xs" className="rounded-full" onClick={() => updateCartQuantity(line.key, -1)} aria-label="Μείωση"><Minus /></Button>
                            <span className="min-w-7 text-center text-xs font-black">{line.quantity}</span>
                            <Button variant="ghost" size="icon-xs" className="rounded-full" onClick={() => updateCartQuantity(line.key, 1)} aria-label="Αύξηση"><Plus /></Button>
                          </div>
                          <span className="font-black">{formatPrice(line.unitPrice * line.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <SheetFooter className="border-t border-black/10 bg-background p-5">
                {minimumRemaining > 0 && (
                  <div className="rounded-xl bg-sun/25 px-4 py-3 text-sm font-bold text-ink">
                    Πρόσθεσε ακόμη {formatPrice(minimumRemaining)} για την ελάχιστη παραγγελία.
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-bold"><span>Μεταφορικά</span><span className="text-olive">Δωρεάν</span></div>
                <div className="flex items-center justify-between text-xl font-black"><span>Σύνολο</span><span>{formatPrice(cartTotal)}</span></div>
                <Button disabled={minimumRemaining > 0} onClick={goToCheckout} className="mt-2 h-13 w-full rounded-full bg-primary text-base font-black text-white hover:bg-primary/85">
                  Συνέχεια στο checkout
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-[1.5rem] p-0" showCloseButton={!submitting}>
          {orderResult ? (
            <div className="p-8 text-center sm:p-12">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-olive text-white"><Check className="size-8" /></span>
              <DialogTitle className="mt-6 text-3xl font-black">Η παραγγελία έφυγε!</DialogTitle>
              <DialogDescription className="mx-auto mt-3 max-w-md text-base leading-7">
                Το {branch.name} θα σε καλέσει σύντομα για επιβεβαίωση.
              </DialogDescription>
              <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-muted p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">Αριθμός παραγγελίας</p>
                <p className="mt-2 text-2xl font-black text-primary">{orderResult.orderNumber}</p>
                <div className="mt-4 flex justify-between border-t border-black/10 pt-4 text-sm font-bold"><span>Σύνολο</span><span>{formatPrice(orderResult.total)}</span></div>
                <div className="mt-2 flex justify-between text-sm font-bold"><span>Εκτίμηση</span><span>{orderResult.eta}</span></div>
              </div>
              <Button onClick={() => setCheckoutOpen(false)} className="mt-7 h-12 rounded-full bg-primary px-7 font-black text-white">Έγινε</Button>
            </div>
          ) : (
            <form onSubmit={submitOrder}>
              <div className="border-b border-black/10 p-6 sm:p-8">
                <DialogHeader>
                  <p className="eyebrow">Τελευταίο βήμα</p>
                  <DialogTitle className="text-3xl font-black tracking-tight">Πού να έρθει η παραγγελία;</DialogTitle>
                  <DialogDescription>{branch.name} · {branch.address} · {branch.phone}</DialogDescription>
                </DialogHeader>
              </div>
              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="font-black">Ονοματεπώνυμο</Label>
                  <Input id="customerName" name="customerName" required autoComplete="name" className="h-11 bg-background" placeholder="π.χ. Γιάννης Παπαδόπουλος" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-black">Κινητό τηλέφωνο</Label>
                  <Input id="phone" name="phone" required inputMode="tel" autoComplete="tel" className="h-11 bg-background" placeholder="69XXXXXXXX" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address" className="font-black">Διεύθυνση παράδοσης</Label>
                  <Input id="address" name="address" required autoComplete="street-address" className="h-11 bg-background" placeholder="Οδός και αριθμός" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floorBell" className="font-black">Όροφος / κουδούνι</Label>
                  <Input id="floorBell" name="floorBell" className="h-11 bg-background" placeholder="π.χ. 2ος, Παπαδόπουλος" />
                </div>
                <div className="space-y-2">
                  <Label className="font-black">Πληρωμή</Label>
                  <div className="flex h-11 items-center gap-3 rounded-lg border border-input bg-background px-3 text-sm font-bold">
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-white"><Check className="size-3" /></span>
                    Μετρητά στην παράδοση
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes" className="font-black">Σχόλια για το κατάστημα</Label>
                  <Textarea id="notes" name="notes" className="min-h-24 bg-background" placeholder="Οδηγίες παράδοσης, αλλεργίες ή οτιδήποτε πρέπει να γνωρίζουμε…" />
                  <p className="text-xs leading-5 text-muted-foreground">Για αλλεργίες, το κατάστημα θα επιβεβαιώσει τηλεφωνικά ότι μπορεί να εξυπηρετήσει.</p>
                </div>
                <Label className="items-start rounded-xl border border-black/10 bg-background p-4 leading-5 sm:col-span-2">
                  <Checkbox checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))} className="mt-0.5" />
                  <span>Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου αποκλειστικά για την εκτέλεση αυτής της παραγγελίας.</span>
                </Label>
                {checkoutError && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive sm:col-span-2" aria-live="polite">{checkoutError}</p>}
              </div>
              <div className="flex flex-col gap-3 border-t border-black/10 bg-background p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Σύνολο · δωρεάν delivery</p>
                  <p className="text-2xl font-black">{formatPrice(cartTotal)}</p>
                </div>
                <Button type="submit" disabled={!acceptedTerms || submitting} className="h-13 rounded-full bg-primary px-7 text-base font-black text-white hover:bg-primary/85">
                  {submitting ? 'Καταχώρηση…' : 'Ολοκλήρωση παραγγελίας'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {cartCount > 0 && !cartOpen && (
        <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
          <Button onClick={() => setCartOpen(true)} className="h-16 w-full justify-between rounded-full bg-ink px-5 text-white shadow-[0_14px_45px_rgb(0_0_0/30%)] hover:bg-ink/90">
            <span className="flex items-center gap-3 font-black"><span className="grid size-8 place-items-center rounded-full bg-primary">{cartCount}</span> Δες το καλάθι</span>
            <span className="font-black">{formatPrice(cartTotal)}</span>
          </Button>
        </div>
      )}
    </main>
  );
}
