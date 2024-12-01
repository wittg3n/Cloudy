// lib/dnsMap.ts

export const dnsMap = {
  Radar: ["10.202.10.10", "10.202.10.11"],
  Electro: ["78.157.42.100", "78.157.42.101"],
  Shecan: ["178.22.122.100", "185.51.200.2"],
  Yandex: ["77.88.8.8", "77.88.8.1"],
  Google: ["8.8.8.8", "8.8.4.4"],
  Cloudflare: ["1.1.1.1", "1.0.0.1"],
  OpenDNS: ["208.67.222.222", "208.67.220.220"],
  Quad9: ["9.9.9.9", "149.112.112.112"],
  CleanBrowsing: ["185.228.168.168", "185.228.169.168"],
  AdGuard: ["94.140.14.14", "94.140.15.15"],
  DNSWatch: ["84.200.69.80", "84.200.70.40"],
  Comodo: ["8.26.56.26", "8.20.247.20"],
  Verisign: ["64.6.64.6", "64.6.65.6"],
};

// Optionally, you can also export a type if you're using TypeScript
export type DNSMap = typeof dnsMap;
