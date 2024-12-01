import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

type UseCurrentDNSResult = {
  dns: string | null;
  interfaces: string | null;
  error: string | null;
  dnsNotfound: string | null;
};

type DNSMap = Record<string, [string, string]>;

const dnsMap: DNSMap = {
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

function getDnsName(
  dnsString: string,
  dnsMap: Record<string, [string, string]>
): string | null {
  const [primary, secondary] = dnsString.split("-");

  for (const [name, [primaryDns, secondaryDns]] of Object.entries(dnsMap)) {
    if (primary === primaryDns && secondary === secondaryDns) {
      return name;
    }
  }

  return null;
}
function useCurrentDNS(): UseCurrentDNSResult {
  const [dns, setDns] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [interfaces, setInterfaces] = useState<string | null>(null);
  const [dnsNotfound, setDnsNotfound] = useState<string | null>(null);

  useEffect(() => {
    const fetchDNS = async () => {
      try {
        const result: [string, string] = await invoke("get_current_dns");
        const dnsProvider = getDnsName(result[1], dnsMap);
        console.log(result[0]);
        setInterfaces(result[0]);
        if (dnsProvider) {
          setDns(dnsProvider);
        } else {
          setDnsNotfound("DNS not found in the known DNS providers.");
        }
      } catch (err) {
        setError("Error fetching DNS");
        console.error(err);
      }
    };

    fetchDNS();
  }, []);

  return { dns, error, interfaces, dnsNotfound };
}
export default useCurrentDNS;
