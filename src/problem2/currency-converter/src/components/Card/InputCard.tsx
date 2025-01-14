import { Card, CardProps, Col, Form, InputNumber, Row, Typography } from "antd";
import CurrencySelect from "../Select/CurrencySelect";
import { countries } from "../../const/const";
import { validatePositiveAmount } from "../../utils/validations";
import {
  formatNumber,
  parserNumberFormItem,
  preventKeyInput,
} from "../../utils/helpers";
import "./style.scss";

interface InputCardPropsType extends CardProps {
  label: string;
  parrentKey: string;
  onChangeInputObject?: (value?: string, currency?: string) => void;
  onChangeValue?: (value: string) => void;
  onChangeCurrency?: (value: string) => void;
  disabled?: boolean;
}

const InputCard = ({
  label,
  parrentKey,
  onChangeValue,
  onChangeCurrency,
  onChangeInputObject,
  disabled,
  ...props
}: InputCardPropsType) => {
  const formInstance = Form.useFormInstance();

  const currencyValue = Form.useWatch([parrentKey, "currency"]);
  const money = Form.useWatch([parrentKey, "value"]);

  const onSelectCurrency = (value: string) => {
    formInstance.setFieldValue([parrentKey, "currency"], value);
    onChangeCurrency?.(value);
  };

  return (
    <Card {...props}>
      <Typography.Text>{label}</Typography.Text>
      <Row gutter={[16, 16]}>
        <Col span={20} className="flex items-top">
          <Form.Item
            className="w-full"
            name={[parrentKey, "value"]}
            rules={[validatePositiveAmount]}
          >
            <InputNumber
              formatter={formatNumber}
              parser={parserNumberFormItem}
              onKeyDown={preventKeyInput}
              onChange={(value: string | number | null) => {
                onChangeInputObject?.(value as string, currencyValue);
                onChangeValue?.(value as string);
              }}
              controls={false}
              className="currency-input w-full text-[18px] py-[5px] border-none bg-[#f5f5f5] hover:bg-[#f5f5f5] focus-within:border-none focus-within:border-transparent focus-within:bg-[#f5f5f5] focus-within:shadow-none"
              placeholder="0.00"
            />
          </Form.Item>
        </Col>
        <Col className="flex items-top justify-center" span={4}>
          <Form.Item
            name={[parrentKey, "currency"]}
            initialValue={countries[0].code}
          >
            <CurrencySelect
              options={countries}
              disabled={disabled}
              value={currencyValue}
              onChange={(value) => {
                onSelectCurrency(value);
                onChangeInputObject?.(money, value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default InputCard;
