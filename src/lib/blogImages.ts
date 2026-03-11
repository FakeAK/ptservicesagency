import tdac from '../assets/blog/tdac.webp';
import dtv90day from '../assets/blog/dtv-90-day.webp';
import schengenVisa from '../assets/blog/schengen-visa.webp';
import immigrationOffice from '../assets/blog/immigration-office.webp';
import montSaintMichel from '../assets/blog/mont-saint-michel.webp';
import reEntryPermit from '../assets/blog/re-entry-permit.webp';
import tdacReview from '../assets/blog/tdac-review.webp';
import muayThaiFight from '../assets/blog/muay-thai-fight.webp';
import thailandVisaGuide from '../assets/blog/thailand-visa-guide.webp';

export const blogImages = {
  'tdac': tdac,
  'dtv-90-day': dtv90day,
  'schengen-visa': schengenVisa,
  'immigration-office': immigrationOffice,
  'mont-saint-michel': montSaintMichel,
  're-entry-permit': reEntryPermit,
  'tdac-review': tdacReview,
  'muay-thai-fight': muayThaiFight,
  'thailand-visa-guide': thailandVisaGuide,
} as const;

export type BlogImageKey = keyof typeof blogImages;
