import { Button, Dropdown, Input } from "antd";
import { ReactNode, useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import CurrencyMenu from "./CurrencyMenu";

type CurrencySelectPropsType = {
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  options: Record<string, any>[];
};

const CurrencySelect = ({
  onChange,
  value,
  disabled,
  options,
}: CurrencySelectPropsType) => {
  const [searchKey, setSearchKey] = useState("");
  const [open, setOpen] = useState(false);

  const searchOptions = useMemo(() => {
    if (!searchKey) return options;
    return options.filter(
      (el) =>
        el.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        el.code.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey]);

  const dropdownContent = (menus: ReactNode): ReactNode => {
    return (
      <div className="bg-[#fff] p-2 rounded-md border-stone-200 border-[1px]">
        <Input
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          className="focus-within:shadow-none focus-within:border-[#d9d9d9] hover:border-[#d9d9d9] mb-[8px]"
          prefix={<SearchOutlined />}
        />
        <CurrencyMenu
          onChange={(value) => {
            onChange(value);
            setOpen(false);
            setSearchKey("");
          }}
          value={value}
          list={searchOptions.sort((a, b) => a.name.localeCompare(b.name))}
        />
      </div>
    );
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSearchKey("");
    }
    setOpen(open);
  };

  return (
    <Dropdown
      open={open}
      dropdownRender={dropdownContent}
      disabled={disabled}
      placement="bottom"
      trigger={["click"]}
      arrow
      className="mt-[6px]"
      onOpenChange={onOpenChange}
    >
      <Button className="h-auto py-[5px] border-none">
        {value || "Select"}
      </Button>
    </Dropdown>
  );
};

export default CurrencySelect;
