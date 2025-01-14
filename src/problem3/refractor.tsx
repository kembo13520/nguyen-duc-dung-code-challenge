// With the old code, everything was in one file, which made it very difficult to read and maintain. 
// --> It lacked extensibility and reusability. 
// We should separate it into smaller components in diffirent files. 
// Additionally, functions can be broken out into utility functions and custom hooks. 
// --> All of these changes will make the code easier to read, maintain, and reuse in various situations.

// types.ts
// Separating types into a dedicated file provides:
// 1. Easy type reusability across components
// 2. Single source of truth for type definitions
// 3. Better maintainability and scalability
export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number; // Store USD value to avoid recalculations
}

export interface WalletPageProps extends BoxProps {}

// constants.ts
// Centralizing constants provides:
// 1. Easy value modifications without changing business logic
// 2. Elimination of magic numbers
// 3. Reusability across the application
export const BLOCKCHAIN_PRIORITIES = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

// utils/wallet.ts
// Utility functions separation provides:
// 1. Clear and concise code
// 2. Reusable functions across components
export const formatWalletBalance = (
  balance: WalletBalance,
  price: number
): FormattedWalletBalance => ({
  ...balance,
  formatted: balance.amount.toFixed(),
  usdValue: balance.amount * price, // Calculate USD value once and store
});

// With the old code, the switch case is executed once for each iteration, which is not optimal for performance.
// Using bracket notation would be faster and also easier to read. 
// Additionally, there is no need for a default value (-99) anymore.

export const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain];
};

// hooks/useWalletData.ts
// Custom hook benefits:
// 1. Separates data processing logic from components
// 2. Enables logic reuse across components

export const useWalletData = (
  balances?: WalletBalance[],
  prices?: Record<string, number>
) => {
  return useMemo(() => {
    // Stop the function if there is no input
    if (!balances || !prices) return;
    // Validate balance criteria
    // The old code is too hard to read and maintain, with unclear values. 
    // Additionally, the filter function will always return an empty array with the old approach.
    // There are also logical errors, such as (balance.amount < 0).
    const isValidBalance = (balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain);
      return Boolean(priority) && balance.amount > 0;
    };

    // Compare balances for sorting
    // The old code was hard to read and had complex logic. This way of writing is much easier to read.
    const compareBalances = (lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority;
    };

    // Process balances with optimized operations chain
    return balances
      .filter(isValidBalance)
      .sort(compareBalances)
      .map((balance) => formatWalletBalance(balance, prices[balance.currency]));
  }, [balances, prices]); // Recompute only when dependencies change
};

// components/WalletRow.tsx
// Component separation benefits:
// 1. Improved code maintenance
// 2. Reusable UI components
// --> In this case, components should only be used for rendering and displaying the UI, not for handling logic.

interface WalletRowProps extends React.HTMLProps<HTMLDivElement> {
  balance: FormattedWalletBalance;
}

export const WalletRow = ({ balance, ...props }: WalletRowProps) => {
  return (
    <div {...props}>
      <WalletRowContent
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    </div>
  );
};

// pages/WalletPage.tsx
// Main component benefits:
// 1. Clean and focused render logic
// 2. Clear data flow
// 3. Separated concerns

export const WalletPage = ({ ...rest }: WalletPageProps) => {
  // Data fetching and processing
  const balances = useWalletBalances();
  const prices = usePrices();
  const formattedBalances = useWalletData(balances, prices);

  // UI rendering
  return (
    <div {...rest}>
      {formattedBalances?.map((balance, index) => (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}-${index}`}
          balance={balance}
        />
      ))}
    </div>
  );
};

export default WalletPage;
