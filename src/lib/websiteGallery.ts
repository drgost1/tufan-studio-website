// The public websites shown on the web developer page, checked live on 1 Nov 2026.
// Left out on purpose: sites still set to noindex (awaiting client sign-off), sites
// that were offline, and Wedding Couple, whose homepage shows real members' photos.
// Order is curated: the strongest variety comes first because only the top 12 show
// until a visitor expands the list.

export type WebsiteSector = "Platforms" | "Education" | "Healthcare" | "Retail" | "Corporate" | "Hospitality";

export type GalleryWebsite = {
  name: string;
  domain: string;
  sector: WebsiteSector;
};

export const WEBSITE_SECTORS: readonly WebsiteSector[] = [
  "Platforms",
  "Education",
  "Healthcare",
  "Retail",
  "Corporate",
  "Hospitality",
];

export const GALLERY_WEBSITES: readonly GalleryWebsite[] = [
  { name: "Tufan Health", domain: "health.tufanstudio.net", sector: "Platforms" },
  { name: "International Autism Foundation", domain: "internationalautismfoundation.org", sector: "Healthcare" },
  { name: "Royal Park Guest House", domain: "royalparkguesthouse.com", sector: "Hospitality" },
  { name: "3D Comet Design", domain: "3dcometdesign.com", sector: "Corporate" },
  { name: "VTTC", domain: "vttcbd.com", sector: "Education" },
  { name: "B Beauty Mart", domain: "bbeautymart.com", sector: "Retail" },
  { name: "Chef SJ Private Chef", domain: "privatechef.tc", sector: "Hospitality" },
  { name: "Dr Md Monowar Hossain", domain: "drmdmonowarhossain.com", sector: "Healthcare" },
  { name: "DewDrop Trade International", domain: "dewdropbd.com", sector: "Corporate" },
  { name: "Gen-Z Learning", domain: "gen-zlearning.top", sector: "Education" },
  { name: "Trizone Bangladesh", domain: "trizonebangladesh.com", sector: "Retail" },
  { name: "Founders Movement", domain: "founders.virtualonline.website", sector: "Platforms" },

  { name: "YoPekka", domain: "yopekka.com", sector: "Platforms" },
  { name: "PRS Result Software", domain: "perfectnresults.com", sector: "Platforms" },
  { name: "Thala POS", domain: "resturantbilling.virtualonline.website", sector: "Platforms" },
  { name: "Dominator Championship", domain: "dominatorofficial.tufanstudio.net", sector: "Platforms" },
  { name: "Monopoly", domain: "monopoly.tufanstudio.net", sector: "Platforms" },
  { name: "FM Work", domain: "fm-work.tufanstudio.net", sector: "Platforms" },
  { name: "Virtual Online", domain: "virtualonline.website", sector: "Platforms" },
  { name: "Learnova", domain: "learnovaeducation.com", sector: "Education" },
  { name: "Cinnamon International", domain: "cinnamonedu.com", sector: "Education" },
  { name: "Nurani Education Board", domain: "nuranieduboard.com", sector: "Education" },
  { name: "E-commerce Masterclass", domain: "course.virtualonline.website", sector: "Education" },
  { name: "Websites for Doctors", domain: "doctor.virtualonline.website", sector: "Healthcare" },
  { name: "A One BD", domain: "aonebd.com", sector: "Retail" },
  { name: "B2C World", domain: "b2cworld.com", sector: "Retail" },
  { name: "TopSell Mart", domain: "topsellmart.com", sector: "Retail" },
  { name: "MensART", domain: "mensart.com.bd", sector: "Retail" },
  { name: "KS Global", domain: "ksglobalbd.com", sector: "Retail" },
  { name: "Zahid Industries", domain: "bewalt.com", sector: "Corporate" },
  { name: "Bango Power Solution", domain: "bangopower.com", sector: "Corporate" },
  { name: "Marvelous Corporation", domain: "marvelous-corporation.com", sector: "Corporate" },
  { name: "Music for Life Registration", domain: "artistreg.marvelous-corporation.com", sector: "Corporate" },
  { name: "Macon Engineering", domain: "maconiac.com", sector: "Corporate" },
  { name: "Silver Engineering", domain: "silverdoorbd.com", sector: "Corporate" },
  { name: "SP Technology", domain: "sptechnologysolutions.com", sector: "Corporate" },
  { name: "S.H. Enterprise", domain: "shenterprise2008.com", sector: "Corporate" },
  { name: "Abdullah & Sons Engineering", domain: "abdullahandsons.com", sector: "Corporate" },
  { name: "Advanced Electronics", domain: "advanced62.com", sector: "Corporate" },
  { name: "Breeze Trade International", domain: "breezetrade.virtualonline.website", sector: "Corporate" },
  { name: "Layali Car Parking", domain: "layalicarparking.com", sector: "Corporate" },
  { name: "Shinbao", domain: "shinbao.com", sector: "Corporate" },
  { name: "Bunyad Properties", domain: "bunyadpl.com", sector: "Corporate" },
  { name: "Rom Software", domain: "rombd.net", sector: "Corporate" },
  { name: "TAAS IT Solutions", domain: "taasitsolutions.com", sector: "Corporate" },
  { name: "BAISOS", domain: "baisos.com", sector: "Corporate" },
  { name: "Rent Car BD", domain: "rentcarbd.com", sector: "Hospitality" },
];

export function websiteThumbnail(domain: string) {
  return `/images/sites/${domain.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.webp`;
}
