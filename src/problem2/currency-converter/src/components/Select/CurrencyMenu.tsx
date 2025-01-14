type CurrencyMenuProps = {
  list: Record<string, any>[];
  onChange: (value: string) => void;
  value: string;
};

const CurrencyMenu = ({ list, value, onChange }: CurrencyMenuProps) => {
  const onClick = (value: string) => {
    onChange(value);
  };

  return (
    <div className="max-h-[200px] overflow-y-auto">
      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.map((el) => (
          <li
            key={el.code}
            onClick={() => {
              onClick(el.code);
            }}
            className={`flex items-center mb-[8px] cursor-pointer hover:bg-slate-200 p-[4px] rounded-sm ${
              value === el.code ? "bg-slate-200" : ""
            }`}
          >
            <img
              src={el.flag}
              alt={`Flag of ${el.name}`}
              style={{ width: "30px", height: "20px", marginRight: "10px" }}
            />
            <span>
              {el.name} ({el.code})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyMenu;
