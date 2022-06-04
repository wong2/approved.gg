import openseaIcon from "./assets/opensea.svg";
import openseaDisabledIcon from "./assets/opensea-n.svg";
import looksrareIcon from "./assets/looksrare.svg";
import looksrareDisabledIcon from "./assets/looksrare-n.svg";
import x2y2Icon from "./assets/x2y2.svg";
import x2y2DisabledIcon from "./assets/x2y2-n.svg";

export const MARKETS = [
  {
    name: "OpenSea",
    icons: [openseaDisabledIcon, openseaIcon],
    contract: "0x7D3c534341665AC581015AeF459bfcBA305ab048",
  },
  {
    name: "LooksRare",
    icons: [looksrareDisabledIcon, looksrareIcon],
    contract: "0xf42aa99F011A1fA7CDA90E5E98b277E306BcA83e",
  },
  {
    name: "X2Y2",
    icons: [x2y2DisabledIcon, x2y2Icon],
    contract: "0xF849de01B080aDC3A814FaBE1E2087475cF2E354",
  },
];
