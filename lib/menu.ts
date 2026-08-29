export type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  hasOptions: boolean;
  popular: boolean;
  image: string | null;
};

export const menuItems: readonly MenuItem[] = [
  {
    "id": "IT_000000000001",
    "category": "Ορεκτικά",
    "name": "Πατάτες τηγανητές",
    "price": 3.5,
    "description": "Παράγγειλε τηγανητές πατάτες και προσπάθησε να βρεις έναν λόγο, που οι τηγανητές πατάτες είναι συνοδευτικό και όχι κυρίως.",
    "hasOptions": false,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000001?c=1775211079"
  },
  {
    "id": "IT_000000000002",
    "category": "Ορεκτικά",
    "name": "Πατάτες τηγανητές με σως & cheddar",
    "price": 4.5,
    "description": "Παράγγειλε τηγανητές πατάτες και προσπάθησε να βρεις έναν λόγο, που οι τηγανητές πατάτες είναι συνοδευτικό και όχι κυρίως.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000002?c=1775211281"
  },
  {
    "id": "IT_000000000003",
    "category": "Ορεκτικά",
    "name": "Πατάτες τηγανητές με σως, cheddar & μπέικον",
    "price": 5,
    "description": "Παράγγειλε τηγανητές πατάτες και προσπάθησε να βρεις έναν λόγο, που οι τηγανητές πατάτες είναι συνοδευτικό και όχι κυρίως.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000003?c=1775211087"
  },
  {
    "id": "IT_000000000533",
    "category": "Ορεκτικά",
    "name": "Πατάτες τηγανητές με σως φέτας",
    "price": 4.5,
    "description": "Μερίδα",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:patates-tiganites-me-sws-phetas?c=1742482655"
  },
  {
    "id": "IT_000000000004",
    "category": "Ορεκτικά",
    "name": "Κοπανιστή",
    "price": 3.5,
    "description": "Μερίδα",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000004?c=1775208468"
  },
  {
    "id": "IT_000000000005",
    "category": "Ορεκτικά",
    "name": "Τυροσαλάτα",
    "price": 3.5,
    "description": "Μερίδα",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000005?c=1775208116"
  },
  {
    "id": "IT_000000000246",
    "category": "Dips",
    "name": "Dip sauce",
    "price": 1.8,
    "description": "Στα σος κάθε γεύματος, οι σως που το συνοδεύουν!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000246?c=1775208540"
  },
  {
    "id": "IT_000000000247",
    "category": "Dips",
    "name": "Dip τζατζίκι",
    "price": 1.8,
    "description": "Εδώ δεν χωράνε συστάσεις. Τζατζίκι, το κλασικό, το αληθινό, το αγαπημένο. Ζήτα άδεια από τους παρευρισκόμενους και κατανάλωσε εντελώς ανεύθυνα!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000247?c=1775208783"
  },
  {
    "id": "IT_000000000248",
    "category": "Dips",
    "name": "Dip γιαούρτι",
    "price": 1.8,
    "description": "Στα σος κάθε γεύματος, οι σως που το συνοδεύουν!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000248?c=1775208590"
  },
  {
    "id": "IT_000000000025",
    "category": "Σαλάτες",
    "name": "Λάχανο & καρότο",
    "price": 4.5,
    "description": "Δροσερή και χορταστική σαλάτα λάχανο & καρότο. Πάει με όλα τα κυρίως και γίνεται κυρίως όταν θέλεις κάτι υγιεινό που θα σε κρατήσει! ",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:laxano-kai-karoto?c=1727544404"
  },
  {
    "id": "IT_000000000026",
    "category": "Σαλάτες",
    "name": "Ντομάτα & αγγούρι",
    "price": 4.5,
    "description": "Η αγγουροντομάτα είναι μια σαλάτα που έχει καταφέρει να είναι στα κυρίως, να είναι συνοδευτικό, να είναι απαραίτητη! ",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:ntomata-kai-aggouri?c=1727542714"
  },
  {
    "id": "IT_000000000027",
    "category": "Σαλάτες",
    "name": "Χωριάτικη",
    "price": 7.5,
    "description": "Σαλάτα με ντομάτα, αγγούρι, κρεμμύδι, πράσινη πιπεριά, φέτα & ελιές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000027?c=1775208912"
  },
  {
    "id": "IT_000000000028",
    "category": "Σαλάτες",
    "name": "Ανάμεικτη",
    "price": 4.5,
    "description": "Σαλάτα με λάχανο, κόκκινο λάχανο, ρόκα, καρότο & μαρούλι",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000028?c=1775210831"
  },
  {
    "id": "IT_000000000029",
    "category": "Σαλάτες",
    "name": "Μαρούλι",
    "price": 4.5,
    "description": "Σαλάτα με μαρούλι, άνηθο & φρέσκο κρεμμύδι",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000029?c=1775210723"
  },
  {
    "id": "IT_000000000030",
    "category": "Σαλάτες",
    "name": "Κοτοσαλάτα",
    "price": 8.5,
    "description": "Σαλάτα με μαρούλι, λόλα κόκκινη, λόλα πράσινη, γύρο κοτόπουλο & σως Παρόλι",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kotosalata?c=1770217257"
  },
  {
    "id": "IT_000000000035",
    "category": "Τεμάχια",
    "name": "Καλαμάκι χοιρινό",
    "price": 2.5,
    "description": "130gr. Συνοδεύεται από πίτα & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000035?c=1775213335"
  },
  {
    "id": "IT_000000000519",
    "category": "Τεμάχια",
    "name": "Καλαμάκι χοιρινό χειροποίητο",
    "price": 2.5,
    "description": "130gr. Συνοδεύεται από πίτα  & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": true,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-xeiropoiito?c=1776187856"
  },
  {
    "id": "IT_000000000036",
    "category": "Τεμάχια",
    "name": "Καλαμάκι κοτόπουλο",
    "price": 2.5,
    "description": "130gr. Συνοδεύεται από πίτα  & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000036?c=1775213343"
  },
  {
    "id": "IT_000000000520",
    "category": "Τεμάχια",
    "name": "Καλαμάκι κοτόπουλο μπούτι",
    "price": 2.5,
    "description": "130gr. Συνοδεύεται από πίτα  & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-kotopoulo-mpouti?c=1743496002"
  },
  {
    "id": "IT_000000000037",
    "category": "Τεμάχια",
    "name": "Κεμπάπ Παρόλι",
    "price": 2.5,
    "description": "120gr. Από 80% μοσχαρίσιο κιμά & 20% αρνίσιο κιμά. Συνοδεύεται από πίτα  & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kempap-paroli?c=1766434520"
  },
  {
    "id": "IT_000000000038",
    "category": "Τεμάχια",
    "name": "Κοτομπέικον",
    "price": 2.5,
    "description": "140gr. Συνοδεύεται από πίτα  & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000038?c=1775213368"
  },
  {
    "id": "IT_000000000043",
    "category": "Τυλιχτά",
    "name": "Γύρος χοιρινός σε πίτα",
    "price": 4.9,
    "description": "Πίτα γύρο χοιρινό με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000043?c=1775213979"
  },
  {
    "id": "IT_000000000044",
    "category": "Τυλιχτά",
    "name": "Γύρος κοτόπουλο σε πίτα",
    "price": 4.9,
    "description": "Πίτα γύρο κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000044?c=1755530507"
  },
  {
    "id": "IT_000000000045",
    "category": "Τυλιχτά",
    "name": "Ντονέρ μοσχαρίσιο σε πίτα",
    "price": 4.5,
    "description": "Πίτα ντονέρ μοσχαρίσιο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:ntoner-mosxarisio-se-pita?c=1755353561"
  },
  {
    "id": "IT_000000000046",
    "category": "Τυλιχτά",
    "name": "Καλαμάκι χοιρινό σε πίτα",
    "price": 4.5,
    "description": "Πίτα καλαμάκι χοιρινό με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": true,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-se-pita?c=1787833081"
  },
  {
    "id": "IT_000000000521",
    "category": "Τυλιχτά",
    "name": "Καλαμάκι χοιρινό χειροποίητο σε πίτα",
    "price": 4.5,
    "description": "Πίτα καλαμάκι χοιρινό χειροποίητο με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-xeiropoiito-se-pita?c=1787833081"
  },
  {
    "id": "IT_000000000047",
    "category": "Τυλιχτά",
    "name": "Καλαμάκι κοτόπουλο σε πίτα",
    "price": 4.5,
    "description": "Πίτα καλαμάκι κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000047?c=1775213963"
  },
  {
    "id": "IT_000000000112",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι γύρος χοιρινός",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι γύρο χοιρινό με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000113",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι γύρος κοτόπουλο",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι γύρο κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000114",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι καλαμάκι χοιρινό",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι καλαμάκι χοιρινό με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000523",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι καλαμάκι χοιρινό χειροποίητο",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι καλαμάκι χοιρινό χειροποίητο με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000115",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι καλαμάκι κοτόπουλο",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι καλαμάκι κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000524",
    "category": "Σουβλακοσφηνάκια",
    "name": "Σουβλακοσφηνάκι καλαμάκι κοτόπουλο μπούτι",
    "price": 7.5,
    "description": "Σουβλακοσφηνάκι καλαμάκι κοτόπουλο μπούτι με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000068",
    "category": "Σάντουιτς καντίνας",
    "name": "Γύρος χοιρινός σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς γύρο χοιρινό με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000068?c=1775213688"
  },
  {
    "id": "IT_000000000069",
    "category": "Σάντουιτς καντίνας",
    "name": "Γύρος κοτόπουλο σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς γύρο κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:guros-kotopoulo-se-santouits?c=1779888436"
  },
  {
    "id": "IT_000000000070",
    "category": "Σάντουιτς καντίνας",
    "name": "Καλαμάκι χοιρινό σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς καλαμάκι χοιρινό με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-se-santouits?c=1787845104"
  },
  {
    "id": "IT_000000000525",
    "category": "Σάντουιτς καντίνας",
    "name": "Καλαμάκι χοιρινό χειροποίητο σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς καλαμάκι χοιρινό χειροποίητο με τα υλικά της επιλογή σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-xeiropoiito-se-santouits?c=1787845104"
  },
  {
    "id": "IT_000000000071",
    "category": "Σάντουιτς καντίνας",
    "name": "Καλαμάκι κοτόπουλο σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς καλαμάκι κοτόπουλο με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-kotopoulo-se-santouits?c=1786089902"
  },
  {
    "id": "IT_000000000526",
    "category": "Σάντουιτς καντίνας",
    "name": "Καλαμάκι κοτόπουλο μπούτι σε σάντουιτς",
    "price": 7.6,
    "description": "Σάντουιτς καλαμάκι κοτόπουλο μπούτι με τα υλικά της επιλογής σας",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-kotopoulo-mpouti-se-santouits?c=1786089902"
  },
  {
    "id": "IT_000000000129",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή γύρος χοιρινός",
    "price": 9.8,
    "description": "Σκεπαστή γύρος χοιρινός με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": true,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000129?c=1775212052"
  },
  {
    "id": "IT_000000000130",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή γύρος κοτόπουλο",
    "price": 9.8,
    "description": "Σκεπαστή  γύρος κοτόπουλο με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000130?c=1775212058"
  },
  {
    "id": "IT_000000000131",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή καλαμάκι χοιρινό",
    "price": 9.8,
    "description": "Σκεπαστή καλαμάκι χοιρινό με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000131?c=1775212064"
  },
  {
    "id": "IT_000000000527",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή καλαμάκι χοιρινό χειροποίητο",
    "price": 9.8,
    "description": "Σκεπαστή καλαμάκι χοιρινό χειροποίητο με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000527?c=1775212072"
  },
  {
    "id": "IT_000000000132",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή καλαμάκι κοτόπουλο",
    "price": 9.8,
    "description": "Σκεπαστή καλαμάκι κοτόπουλο με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000132?c=1775212078"
  },
  {
    "id": "IT_000000000528",
    "category": "Σκεπαστές",
    "name": "Σκεπαστή καλαμάκι κοτόπουλο μπούτι",
    "price": 9.8,
    "description": "Σκεπαστή καλαμάκι κοτόπουλο μπούτι με τα υλικά της επιλογής σας. Συνοδεύεται από πατάτες τηγανητές",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000528?c=1775212086"
  },
  {
    "id": "IT_000000000249",
    "category": "Hot dog",
    "name": "Hot dog special",
    "price": 4.5,
    "description": "Με λουκάνικο, ketchup, μουστάρδα, πατάτες τηγανητές, σως & ανάμεικτη σαλάτα",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:hot-dog-special?c=1787846763"
  },
  {
    "id": "IT_000000000149",
    "category": "Μερίδες",
    "name": "Γύρος χοιρινός μερίδα",
    "price": 12,
    "description": "Συνοδεύεται από 2 πίτες, ντομάτα, κρεμμύδι, τζατζίκι & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:guros-xoirinos-merida?c=1741170925"
  },
  {
    "id": "IT_000000000150",
    "category": "Μερίδες",
    "name": "Γύρος κοτόπουλο μερίδα",
    "price": 12,
    "description": "Συνοδεύεται από 2 πίτες, ντομάτα, ανάμεικτη σαλάτα, σως & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000150?c=1775212390"
  },
  {
    "id": "IT_000000000151",
    "category": "Μερίδες",
    "name": "Καλαμάκι χοιρινό μερίδα",
    "price": 12,
    "description": "3 Τεμάχια των 130gr. Συνοδεύεται από 2 πίτες, ντομάτα, κρεμμύδι, τζατζίκι & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000151?c=1775212419"
  },
  {
    "id": "IT_000000000529",
    "category": "Μερίδες",
    "name": "Καλαμάκι χοιρινό χειροποίητο μερίδα",
    "price": 12,
    "description": "3 Τεμάχια των 130gr. Συνοδεύεται από 2 πίτες, ντομάτα, κρεμμύδι, τζατζίκι & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-xoirino-xeiropoiito-merida?c=1776879536"
  },
  {
    "id": "IT_000000000152",
    "category": "Μερίδες",
    "name": "Καλαμάκι κοτόπουλο μερίδα",
    "price": 12,
    "description": "3 Τεμάχια των 130gr. Συνοδεύεται από 2 πίτες, ντομάτα, ανάμεικτη σαλάτα, σως & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000152?c=1775212406"
  },
  {
    "id": "IT_000000000530",
    "category": "Μερίδες",
    "name": "Καλαμάκι κοτόπουλο μπούτι μερίδα",
    "price": 12,
    "description": "3 Τεμάχια των 130gr. Συνοδεύεται από 2 πίτες, ντομάτα, ανάμεικτη σαλάτα, σως & πατάτες τηγανητές",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kalamaki-kotopoulo-mpouti-merida?c=1786089923"
  },
  {
    "id": "IT_000000000250",
    "category": "Το κιλό",
    "name": "Γύρος κοτόπουλο φιλέτο το κιλό",
    "price": 16,
    "description": "Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000250?c=1775211422"
  },
  {
    "id": "IT_000000000501",
    "category": "Το κιλό",
    "name": "Κοτόπουλο σχάρας το κιλό",
    "price": 6.8,
    "description": "Συνοδεύεται 1 πιπεριά Φλωρίνης & λεμόνι. Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000501?c=1775212610"
  },
  {
    "id": "IT_000000000502",
    "category": "Το κιλό",
    "name": "Γύρος χοιρινός το κιλό",
    "price": 16,
    "description": "Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000502?c=1775211438"
  },
  {
    "id": "IT_000000000503",
    "category": "Το κιλό",
    "name": "Γύρος κοτόπουλο φιλέτο το κιλό",
    "price": 16,
    "description": "Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000503?c=1775211431"
  },
  {
    "id": "IT_000000000504",
    "category": "Το κιλό",
    "name": "Πανσέτα σχάρας το κιλό",
    "price": 12,
    "description": "Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000504?c=1775211451"
  },
  {
    "id": "IT_000000000505",
    "category": "Το κιλό",
    "name": "Μπριζολάκι χοιρινό χωρίς κόκαλο το κιλό",
    "price": 12,
    "description": "Η τελική τιμή του προϊόντος θα διαμορφωθεί κατά το ζύγισμα",
    "hasOptions": true,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000505?c=1775211458"
  },
  {
    "id": "IT_000000000194",
    "category": "Γλυκά",
    "name": "Cheesecake",
    "price": 4,
    "description": "Cheeeese! Χαμογέλα, ώρα για cake. Παράγγειλε το πιο νόστιμο, ελαφρύ και αγαπημένο γλυκό κάθε εποχής του χρόνου.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:cheesecake?c=1779280801"
  },
  {
    "id": "IT_000000000195",
    "category": "Γλυκά",
    "name": "Προφιτερόλ",
    "price": 4,
    "description": "Γλυκιά απόλαυση",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/restaurants/2551990/menu_item/000000000195?c=1784053538"
  },
  {
    "id": "IT_000000000196",
    "category": "Γλυκά",
    "name": "Εκμέκ κανταΐφι",
    "price": 4,
    "description": "Γλυκιά απόλαυση",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:ekmek-kantaiphi?c=1766497338"
  },
  {
    "id": "IT_000000000198",
    "category": "Γλυκά",
    "name": "Σοκολατόπιτα",
    "price": 4,
    "description": "Αυτή την πίτα τη θες ολόκληρη! Απόλαυσε ένα, δύο, αμέτρητα κομμάτια σοκολατόπιτας, για πρωινό, απογευματινό, βραδινό, για πάντα! ",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:sokolatopita?c=1775752443"
  },
  {
    "id": "IT_000000000199",
    "category": "Γλυκά",
    "name": "Cookies",
    "price": 4,
    "description": "",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:cookies?c=1787815311"
  },
  {
    "id": "IT_000000000202",
    "category": "Γλυκά",
    "name": "Bueno",
    "price": 4,
    "description": "",
    "hasOptions": false,
    "popular": false,
    "image": null
  },
  {
    "id": "IT_000000000210",
    "category": "Αναψυκτικά",
    "name": "Coca-Cola 330ml",
    "price": 2,
    "description": "Η κλασική, μοναδική γεύση που αγαπάς! Δροσιστική, απολαυστική, πάντα η καλύτερη επιλογή!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:coca-cola-330ml?c=1786449213"
  },
  {
    "id": "IT_000000000211",
    "category": "Αναψυκτικά",
    "name": "Coca-Cola light 330ml",
    "price": 2,
    "description": "Η ελαφριά εκδοχή της αγαπημένης σας Coca-Cola, με 0% ζάχαρη & 100% απόλαυση!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:coca-cola-light-330ml?c=1777374683"
  },
  {
    "id": "IT_000000000212",
    "category": "Αναψυκτικά",
    "name": "Coca-Cola zero 330ml",
    "price": 2,
    "description": "Η αυθεντική γεύση της Coca-Cola, χωρίς ζάχαρη! Δροσιστική, λατρεμένη, απόλυτα απολαυστική!\n\nΟ κόσμος τη γνώρισε το 2005 και από τότε δροσίζει με τη υπέροχη γεύση της Coca‑Cola εκατομμύρια ανθρώπους σε περισσότερες από 140 χώρες σε όλο τον κόσμο.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:coca-cola-zero-330ml?c=1777374701"
  },
  {
    "id": "IT_000000000213",
    "category": "Αναψυκτικά",
    "name": "Fanta πορτοκαλάδα 330ml",
    "price": 2,
    "description": "Η απόλυτη δροσιά με την αυθεντική γεύση του πορτοκαλιού.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:fanta-portokalada-330ml?c=1775570378"
  },
  {
    "id": "IT_000000000214",
    "category": "Αναψυκτικά",
    "name": "Fanta πορτοκαλάδα μπλε 330ml",
    "price": 2,
    "description": "Η απόλυτη δροσιά με την αυθεντική γεύση του πορτοκαλιού, χωρίς ανθρακικό.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:fanta-portokalada-mple-330ml?c=1787846485"
  },
  {
    "id": "IT_000000000215",
    "category": "Αναψυκτικά",
    "name": "Fanta λεμονάδα 330ml",
    "price": 2,
    "description": "Η απόλυτη δροσιά με την αυθεντική γεύση του λεμονιού.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:fanta-lemonada-330ml?c=1775569725"
  },
  {
    "id": "IT_000000000233",
    "category": "Μπύρες - Ποτά",
    "name": "Kaiser 330ml",
    "price": 2.5,
    "description": "Παγωμένη μπύρα, δροσιά που μοιράζεται με φίλους.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/kaiser-330ml?c=1776342811"
  },
  {
    "id": "IT_000000000234",
    "category": "Μπύρες - Ποτά",
    "name": "Άλφα 330ml",
    "price": 2.9,
    "description": "",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/alpha-330ml?c=1781166740"
  },
  {
    "id": "IT_000000000235",
    "category": "Μπύρες - Ποτά",
    "name": "Kaiser 500ml",
    "price": 2.9,
    "description": "Η Kaiser ξεχωρίζει για την υψηλή ποιότητα, το βαθύ χρυσαφί της χρώμα και την πλούσια γεύση της. Περιέχει εκλεκτές ποικιλίες κριθαριού και λυκίσκου που ζυμώνονται και ωριμάζουν αργά στις ιδανικότερες συνθήκες, δίνοντας της με αυτόν τον τρόπο τη ξεχωριστή, αξεπέραστη γεύση της.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:kaiser-500ml?c=1775222991"
  },
  {
    "id": "IT_000000000236",
    "category": "Μπύρες - Ποτά",
    "name": "Άλφα 500ml",
    "price": 2.9,
    "description": "Παγωμένη μπύρα, δροσιά που μοιράζεται με φίλους.",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/alpha-500ml?c=1759151286"
  },
  {
    "id": "IT_000000000237",
    "category": "Μπύρες - Ποτά",
    "name": "Κρασί λευκό 500ml",
    "price": 2.5,
    "description": "Τέλειο για να γιορτάσεις τις μικρές νίκες της ζωής ή απλώς για να χαλαρώσεις μετά από μια κουραστική μέρα. Cheers!",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:krasi-leuko-500ml?c=1779360170"
  },
  {
    "id": "IT_000000000238",
    "category": "Μπύρες - Ποτά",
    "name": "Κρασί ροζέ 500ml",
    "price": 2.5,
    "description": "",
    "hasOptions": false,
    "popular": false,
    "image": "https://cdn.e-food.gr/global_assets/vertical:food:krasi-roze-500ml?c=1774948689"
  }
];

export const menuCategories = [
  'Δημοφιλέστερα',
  ...Array.from(new Set(menuItems.map((item) => item.category))),
] as const;

