import { TypographyH1 } from "@/ui/Text";
import { CreateCartForm } from "@/widgets/Cart/CreateCartForm";

export default function () {
  return (
    <div className="grid grid-rows-[min-content_1fr] gap-8">
      <TypographyH1>Корзина</TypographyH1>
      <CreateCartForm />
    </div>
  );
}
