import { Card, Form } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import InputCard from "./InputCard";
import useConvertMoney, {
  ExchangeRatesResponse,
} from "../../hooks/useConvertMoney";
import { useDebounce } from "../../const/useDebounce";
import { convertMoney } from "../../utils/helpers";
import "./style.scss";

const ConverterCard = () => {
  const [form] = useForm();

  const { isConverting, fetchExchangeRates } = useConvertMoney();

  const fromCurrency = Form.useWatch("from", {
    form: form,
    preserve: true,
  });

  const toCurrency = Form.useWatch("to", {
    form: form,
    preserve: true,
  });

  const onChangeValue = async (value?: string, parrentKey?: string) => {
    if (!value) return;
    try {
      const convertResponse = (await fetchExchangeRates(
        parrentKey === "from" ? fromCurrency.currency : toCurrency.currency
      )) as ExchangeRatesResponse;
      const convertedMoney =
        fromCurrency.currency === toCurrency.currency
          ? value
          : convertMoney(
              convertResponse.rates,
              value,
              parrentKey === "from"
                ? toCurrency.currency
                : fromCurrency.currency
            );
      form.setFieldsValue({
        [parrentKey === "from" ? "to" : "from"]: {
          value: convertedMoney,
          currency:
            parrentKey === "from" ? toCurrency.currency : fromCurrency.currency,
        },
      });
    } catch (error) {
      form.setFields([
        {
          name: [parrentKey === "from" ? "from" : "to", "value"],
          errors: ["This currency has no rate"],
        },
      ]);
    }
  };

  const debounceFetch = useDebounce(onChangeValue);

  const onChangeCurrency = (_: string) => {
    ["from", "to"].forEach((el) => {
      form.setFieldValue([el, "value"], undefined);
    });
  };

  const onSwap = () => {
    const currentFromValue = { ...fromCurrency };
    const [fromError, toError] = form.getFieldsError([
      ["from", "value"],
      ["to", "value"],
    ]);
    form.setFieldValue("to", currentFromValue);
    form.setFieldValue("from", toCurrency);
    form.setFields([
      { name: ["from", "value"], errors: toError.errors },
      {
        name: ["to", "value"],

        errors: fromError.errors,
      },
    ]);
  };

  return (
    <Card className="w-2/6 shadow-md">
      <Form form={form} name="converter" layout="vertical">
        <div className="flex flex-col justify-center items-center gap-2">
          <InputCard
            className="bg-[#f5f5f5] w-full"
            label="From"
            parrentKey="from"
            disabled={isConverting}
            onChangeValue={(value) => {
              debounceFetch(value, "from");
            }}
            onChangeCurrency={onChangeCurrency}
          />
          <div className="cursor-pointer rounded-[50%] p-3 w-[40px] h-[40px] bg-slate-50 flex items-center justify-center">
            <SwapOutlined onClick={onSwap} rotate={90} />
          </div>
          <InputCard
            className="bg-[#f5f5f5] w-full"
            disabled={isConverting}
            label="To"
            parrentKey="to"
            onChangeValue={(value) => {
              debounceFetch(value, "to");
            }}
            onChangeCurrency={onChangeCurrency}
          />
        </div>
      </Form>
    </Card>
  );
};

export default ConverterCard;
