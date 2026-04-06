export interface ServiceType {
  id: string;
  title: string;
  titleEn: string;
  desc: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const SERVICES: ServiceType[] = [
  {
    id: 'vip',
    title: 'رجال الأعمال VIP',
    titleEn: 'Business VIP',
    desc: 'سيارات فاخرة مع سائقين محترفين لرحلات الأعمال والاجتماعات',
    icon: 'briefcase',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'ladies',
    title: 'خدمة السيدات',
    titleEn: 'Ladies Service',
    desc: 'سائقات محترفات فقط لراحة وأمان السيدات في كل رحلة',
    icon: 'person',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.15)',
  },
  {
    id: 'hajj',
    title: 'نقل العمرة والحج',
    titleEn: 'Hajj & Umrah',
    desc: 'خدمات نقل متخصصة للمعتمرين والحجاج بأعلى معايير الراحة',
    icon: 'star-crescent',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: 'parcels',
    title: 'توصيل الطرود',
    titleEn: 'Parcel Delivery',
    desc: 'توصيل سريع وآمن للطرود داخل المدينة وبين المدن',
    icon: 'cube',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 'daily',
    title: 'نقل يومي داخل المدن',
    titleEn: 'Daily Rides',
    desc: 'رحلات يومية مريحة وبأسعار منافسة داخل مدينتك',
    icon: 'car',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
  },
  {
    id: 'airport',
    title: 'استقبال وتوصيل المطار',
    titleEn: 'Airport Transfer',
    desc: 'استقبال من المطار وتوصيل إليه بدقة مواعيد واحترافية',
    icon: 'airplane',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
  },
  {
    id: 'eco',
    title: 'سيارات كهربائية',
    titleEn: 'Eco Ride',
    desc: 'رحلات صديقة للبيئة بسيارات كهربائية حديثة ومستدامة',
    icon: 'leaf',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.15)',
  },
];
