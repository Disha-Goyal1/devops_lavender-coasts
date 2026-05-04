import tote from "@/assets/product-tote.jpg";
import scarf from "@/assets/product-scarf.jpg";
import plushie from "@/assets/product-plushie.jpg";
import top from "@/assets/product-top.jpg";
import headband from "@/assets/product-headband.jpg";
import flowers from "@/assets/product-flowers.jpg";
import lipbalm from "@/assets/product-lipbalm.jpg";
import bowKeychain from "@/assets/product-bow-keychain.jpg";
import octopus from "@/assets/product-octopus.jpg";

export type Category = "Accessories" | "Clothing" | "Gifts";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
  badge?: "new" | "best";
}

export const products: Product[] = [
  {
    id: "lavender-tote",
    name: "Lavender Coast Tote",
    price: 1499,
    image: tote,
    category: "Accessories",
    description:
      "A roomy hand-crocheted tote in soft lilac cotton. Carries your day-trip essentials with quiet elegance.",
    badge: "best",
  },
  {
    id: "mist-scarf",
    name: "Mist Scarf",
    price: 999,
    image: scarf,
    category: "Accessories",
    description:
      "Cloud-soft chunky scarf inspired by sea-spray mornings. Wrap up in coastal calm.",
    badge: "new",
  },
  {
    id: "bunny-plush",
    name: "Coastal Bunny Plush",
    price: 849,
    image: plushie,
    category: "Gifts",
    description:
      "Hand-stitched amigurumi bunny made with love. The perfect cuddly companion or thoughtful gift.",
    badge: "best",
  },
  {
    id: "summer-top",
    name: "Summer Crochet Top",
    price: 1899,
    image: top,
    category: "Clothing",
    description:
      "Breezy crochet crop top in cool lavender tones. Made for sun-soaked days by the coast.",
    badge: "new",
  },
  {
    id: "bow-headband",
    name: "Bloom Headband",
    price: 449,
    image: headband,
    category: "Accessories",
    description:
      "A delicate crochet headband with hand-shaped flowers. A soft finish to any look.",
  },
  {
    id: "crochet-bouquet",
    name: "Forever Bouquet",
    price: 1199,
    image: flowers,
    category: "Gifts",
    description:
      "A keepsake bouquet of crocheted blooms. Lasts forever — no water needed.",
    badge: "new",
  },
  {
    id: "lipbalm-holder",
    name: "Lip Balm Holder Keychain",
    price: 299,
    image: lipbalm,
    category: "Accessories",
    description:
      "A snug little crocheted pouch that keeps your favourite lip balm clipped to your bag. Soft lilac cotton with a gold keyring.",
    badge: "new",
  },
  {
    id: "bow-keychain",
    name: "Dainty Bow Keychain",
    price: 249,
    image: bowKeychain,
    category: "Accessories",
    description:
      "A petite hand-tied crochet bow on a gold ring. The sweetest little finishing touch for your keys or bag.",
  },
  {
    id: "octopus-amigurumi",
    name: "Little Lavender Octopus",
    price: 599,
    image: octopus,
    category: "Accessories",
    description:
      "A smiley amigurumi octopus with curly tentacles, hand-stitched in soft lavender cotton. Tiny, huggable, full of charm.",
    badge: "best",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
