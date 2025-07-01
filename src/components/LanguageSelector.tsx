
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' }
};

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-white">
          <Globe className="w-4 h-4" />
          {languages[currentLanguage as keyof typeof languages]?.flag}
          <span className="hidden sm:inline">
            {languages[currentLanguage as keyof typeof languages]?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg border border-gray-200 z-[60]">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={`gap-2 cursor-pointer hover:bg-gray-100 ${currentLanguage === code ? 'bg-blue-50 text-blue-700' : ''}`}
          >
            <span>{flag}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
