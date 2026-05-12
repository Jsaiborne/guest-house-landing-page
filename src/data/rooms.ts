export interface Room {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  price: string;
}

export const rooms: Room[] = [
  {
    slug: 'bedroom-1',
    name: 'Bedroom 1',
    shortDescription: 'A cozy and elegant room perfect for couples.',
    description: 'Bedroom 1 offers a blend of traditional charm and modern comfort. Features a plush queen-sized bed, large windows that let in natural light, and a dedicated workspace. Ideal for those seeking a peaceful retreat.',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200'
    ],
    amenities: ['Queen Bed', 'Free Wi-Fi', 'En-suite Bathroom', 'Coffee Maker', 'Work Desk'],
    price: '₹3,500'
  },
  {
    slug: 'bedroom-2',
    name: 'Bedroom 2',
    shortDescription: 'Spacious room with a beautiful garden view.',
    description: 'Our second bedroom is designed for relaxation. It features premium linens, a comfortable seating area, and direct views of our lush garden. The en-suite bathroom includes a luxurious walk-in shower.',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200'
    ],
    amenities: ['King Bed', 'Garden View', 'Mini Fridge', 'Smart TV', 'Lounge Chair'],
    price: '₹4,000'
  },
  {
    slug: 'bedroom-3',
    name: 'Bedroom 3',
    shortDescription: 'Modern amenities with a touch of local heritage.',
    description: 'Bedroom 3 combines local art with contemporary furniture. It is equipped with all the essentials for a comfortable stay, including high-speed internet and premium toiletries. Perfect for business travelers or solo explorers.',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200'
    ],
    amenities: ['Double Bed', 'Air Conditioning', 'Safe', 'Daily Housekeeping', 'Hairdryer'],
    price: '₹3,200'
  },
  {
    slug: 'bedroom-4',
    name: 'Bedroom 4',
    shortDescription: 'Our largest suite, ideal for families.',
    description: 'Bedroom 4 is our premium suite, offering ample space and additional privacy. It includes a separate living area, two queen beds, and a large bathroom with a soaking tub. Experience the ultimate in luxury at Romillie Hadeljo.',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200'
    ],
    amenities: ['2 Queen Beds', 'Living Area', 'Soaking Tub', 'Dining Table', 'Premium Mini-bar'],
    price: '₹6,000'
  },
  {
    slug: 'bedroom-5',
    name: 'Bedroom 5',
    shortDescription: 'A quiet nook for peaceful solitude.',
    description: 'Located at the end of the hallway, Bedroom 5 offers the most privacy. It is a bright, airy room with minimalist decor that encourages rest and reflection. Wake up to the sounds of nature and enjoy your morning coffee by the window.',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200'
    ],
    amenities: ['Queen Bed', 'Private Balcony', 'Electric Kettle', 'Soft Lighting', 'Plush Robes'],
    price: '₹4,500'
  }
];
