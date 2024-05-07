export default {
  name: 'Nafn',
  tel: 'Sími',
  save: 'Vista',
  clear: 'Hreinsa',
  cancel: 'hætta við',
  confirm: 'Staðfesta',
  delete: 'Eyða',
  loading: 'Hleður...',
  noCoupon: 'Engin afsláttarmiða',
  nameEmpty: 'Vinsamlegast fylltu út nafn',
  addContact: 'Bæta við tengilið',
  telInvalid: 'Gangað símanúmer',
  vanCalendar: {
    end: 'Enda',
    start: 'Byrja',
    title: 'Dagatal',
    weekdays: [
      'sunnudag',
      'Mánudagur',
      'þriðjudag',
      'miðvikudag',
      'fimmtudag',
      'föstudag',
      'laugardag',
    ],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Veldu ekki fleiri en ${maxRange} daga`,
  },
  vanCascader: {
    select: 'Velja',
  },
  vanPagination: {
    prev: 'Fyrri',
    next: 'Næst',
  },
  vanPullRefresh: {
    pulling: 'Dregðu til að endurnýja...',
    loosing: 'Loose to refresh...',
  },
  vanSubmitBar: {
    label: 'Samtals:',
  },
  vanCoupon: {
    unlimited: 'Ótakmarkað',
    discount: (discount: number) => `${discount * 10}% afsláttur`,
    condition: (condition: number) => `Að minnsta kosti ${condition}`,
  },
  vanCouponCell: {
    title: 'Afsláttarmiði',
    count: (count: number) => `Þú átt ${count} afsláttarmiða`,
  },
  vanCouponList: {
    exchange: 'Skipti',
    close: 'Loka',
    enable: 'Laus',
    disabled: 'Ótiltækt',
    placeholder: 'Afsláttarmiðakóði',
  },
  vanAddressEdit: {
    area: 'Svæði',
    areaEmpty: 'Vinsamlega veldu móttökusvæði',
    addressEmpty: 'Heimilisfang má ekki vera tómt',
    addressDetail: 'Heimilisfang',
    defaultAddress: 'Setja sem sjálfgefið heimilisfang',
  },
  vanAddressList: {
    add: 'Bæta við nýju heimilisfangi',
  },
};
