export type Flavor = {
  id: string;
  name: string;
  short: string;
  color: string;
  tagline: string;
  description: string;
  ingredients: string[];
  cal: number;
  protein: string;
  badge: string;
};

export const FLAVORS: Flavor[] = [
  {
    id:          'pb',
    name:        'Peanut Butter Whirl',
    short:       'PB',
    color:       '#C17F3E',
    tagline:     'Creamy swirl, crunchy bite.',
    description: 'Our OG. A thick ribbon of natural peanut butter swirled through an oat base, with a crunch that actually satisfies. No sawdust. No protein-bar guilt.',
    ingredients: ['Rolled Oats', 'Natural Peanut Butter', 'Honey', 'Oat Flour', 'Sea Salt', 'Dark Chocolate Chips'],
    cal:         210,
    protein:     '7g',
    badge:       'Bestseller',
  },
  {
    id:          'strawberry',
    name:        'Strawberry Whirl',
    short:       'Berry',
    color:       '#FF6F91',
    tagline:     'Real fruit, real fun.',
    description: 'Real strawberry pieces folded into every bar. Sweet, slightly tart, and nothing like a strawberry-flavored vitamin. This one actually tastes like the fruit.',
    ingredients: ['Rolled Oats', 'Real Strawberry Pieces', 'Honey', 'White Chocolate', 'Oat Flour', 'Vanilla'],
    cal:         190,
    protein:     '5g',
    badge:       'Fan Favorite',
  },
  {
    id:          'fudge',
    name:        'Choco Fudge Whirl',
    short:       'Fudge',
    color:       '#6B4226',
    tagline:     'Rich, gooey, gone in two bites.',
    description: "A full-on chocolate hit with a fudgy center and crispy edges. It walks the line between dessert and snack and honestly we're fine with that.",
    ingredients: ['Rolled Oats', 'Dark Cocoa', 'Almond Butter', 'Medjool Dates', 'Dark Chocolate', 'Sea Salt'],
    cal:         225,
    protein:     '6g',
    badge:       'Boldest Pick',
  },
  {
    id:          'mango',
    name:        'Mango Whirl',
    short:       'Mango',
    color:       '#FFA63D',
    tagline:     'Sunshine in a wrapper.',
    description: "Dried mango and a hint of lime zest, swirled through a light coconut oat base. It tastes like a vacation. We're not sorry.",
    ingredients: ['Rolled Oats', 'Dried Mango', 'Coconut Flakes', 'Lime Zest', 'Honey', 'Cashew Butter'],
    cal:         195,
    protein:     '4g',
    badge:       'New Drop',
  },
];
