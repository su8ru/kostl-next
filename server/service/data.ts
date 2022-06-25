export const destListKeio: Record<string, string> = {
  "001": "K新宿",
  "002": "笹塚",
  "006": "桜上水",
  "008": "八幡山",
  "012": "つつじ",
  "016": "調布",
  "018": "飛田給",
  "021": "東府中",
  "022": "府中",
  "027": "高幡",
  "031": "北野",
  "032": "京八",
  "033": "N新宿",
  "036": "競馬",
  "037": "動物",
  "042": "高尾",
  "043": "高尾山",
  "048": "若葉台",
  "050": "多摩セ",
  "052": "南大沢",
  "054": "橋本",
  "107": "岩本町",
  "114": "大島",
  "118": "瑞江",
  "120": "本八幡",
  "300": "[新宿]",
  "301": "Ⓢ",
  "302": "[K新]",
  "303": "[調布]",
  "400": "[京八]",
  "401": "[高山]",
  "402": "[橋本]",
  "999": "-",
};

export const fullStationNameList: Record<string, string> = {
  "001": "京王線新宿",
  "002": "笹塚",
  "006": "桜上水",
  "008": "八幡山",
  "012": "つつじヶ丘",
  "016": "調布",
  "018": "飛田給",
  "021": "東府中",
  "022": "府中",
  "027": "高幡不動",
  "031": "北野",
  "032": "京王八王子",
  "033": "新線新宿",
  "036": "府中競馬正門前",
  "037": "多摩動物公園",
  "042": "高尾",
  "043": "高尾山口",
  "048": "若葉台",
  "050": "京王多摩センター",
  "052": "南大沢",
  "054": "橋本",
  "107": "岩本町",
  "114": "大島",
  "118": "瑞江",
  "120": "本八幡",
  "300": "新宿方面",
  "301": "都営新宿線方面",
  "302": "京王線新宿方面",
  "303": "調布方面",
  "400": "京王八王子方面",
  "401": "高尾山口方面",
  "402": "橋本方面",
  "999": "（情報なし）",
};

export const rawStationNameList: Record<string, string> = {
  "001": "新宿",
  "016": "調布",
  "027": "高幡不動",
  "031": "北野",
  "032": "京王八王子",
  "033": "新線新宿",
  "036": "府中競馬正門前",
  "037": "多摩動物公園",
  "043": "高尾山口",
  "050": "京王多摩センター",
  "054": "橋本",
  "114": "大島",
  "120": "本八幡",
  "999": "-",
};

export const stationNameCapitalList: Record<string, string> = {
  "001": "新",
  "016": "調",
  "027": "高",
  "031": "北",
  "032": "八",
  "033": "新",
  "036": "馬",
  "037": "動",
  "043": "山",
  "050": "セ",
  "054": "橋",
  "114": "島",
  "120": "本",
  "999": "-",
};

export const typeList: Record<string, string> = {
  "1": "特急",
  "2": "急行",
  "3": "快速",
  "4": "準特急",
  "5": "区間急行",
  "6": "各駅停車",
  "9": "京王ライナー",
  "10": "臨時",
  "11": "Mt.TAKAO号",
};

export const destListToei: Record<string, string> = {
  Shinjuku: "N新宿",
  Sasazuka: "笹塚",
  Sakurajosui: "桜上水",
  HachimanYama: "八幡山",
  Tsutsujigaoka: "つつじ",
  Wakabadai: "若葉台",
  KeioTamaCenter: "多摩セ",
  Hashimoto: "橋本",
  Takahatafudo: "高幡",
  TamaDobutsukoen: "動物",
  Takaosanguchi: "高尾山",
  KeioHachioji: "京八",
  Motoyawata: "本八幡",
  Mizue: "瑞江",
  Ojima: "大島",
  Iwamotocho: "岩本町",
};

export const toeiStationsEn: ReadonlyArray<string> = [
  "Shinjuku",
  "ShinjukuSanchome",
  "Akebonobashi",
  "Ichigaya",
  "Kudanshita",
  "Jimbocho",
  "Ogawamachi",
  "Iwamotocho",
  "BakuroYokoyama",
  "Hamacho",
  "Morishita",
  "Kikukawa",
  "Sumiyoshi",
  "NishiOjima",
  "Ojima",
  "HigashiOjima",
  "Funabori",
  "Ichinoe",
  "Mizue",
  "Shinozaki",
  "Motoyawata",
] as const;

export const toeiStationsJa: ReadonlyArray<string> = [
  "N新宿",
  "新宿三丁目",
  "曙橋",
  "市ヶ谷",
  "九段下",
  "神保町",
  "小川町",
  "岩本町",
  "馬喰横山",
  "浜町",
  "森下",
  "菊川",
  "住吉",
  "西大島",
  "大島",
  "東大島",
  "船堀",
  "一之江",
  "瑞江",
  "篠崎",
  "本八幡",
] as const;
