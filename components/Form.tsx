import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
const Form = () => {
  return (
    <div className="mt-[40px]">
      <Select>
        <SelectTrigger className="w-[300px] h-[40px] text-[17px] ring-0">
          <SelectValue placeholder="Choose your DNS" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Radar" className="text-[16px]">
            Radar Game DNS
          </SelectItem>
          <SelectItem value="Electro" className="text-[16px]">
            Electro DNS
          </SelectItem>
          <SelectItem value="Google" className="text-[16px]">
            Google Public DNS
          </SelectItem>
          <SelectItem value="Shecan" className="text-[16px]">
            Shecan DNS
          </SelectItem>
          <SelectItem value="Yandex" className="text-[16px]">
            Yandex DNS
          </SelectItem>
          <SelectItem value="cloudflare" className="text-[16px]">
            CloudFlare DNS
          </SelectItem>
        </SelectContent>
      </Select>
      <Button className="transition-all duration-300 w-full text-white  rounded-md mt-6 text-[18px] bg-[#171717] hover:bg-gray-700">
        Activate
      </Button>
    </div>
  );
};
export default Form;
