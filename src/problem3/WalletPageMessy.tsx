// it seems like this interface misses one more property: "blockchain",
// since it is accessed in the sortedBalances

// ideally this interface is not even necessary, it already is avaiable as
// ReturnType<typeof useWalletBalances>
interface WalletBalance {
  currency: string;
  amount: number;
}

// FormattedWalletBalance could extend WalletBalance
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {} // or just use BoxProps
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  //I prefer to move functionality that is not tied to component's lifecycle outside of the component
  // getPriority is a good example of such functionality

  // blockchain could have a narrower type, "string" at least
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);

          // nested if conditions could be replaced with a single one,
          // there seems to be a typo, we need balancePriority > -99,
          // I am not sure if wallets can have negative amounts, depends on business logic
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        // types of lhs and rhs can be inferred
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          // return value could be calculated as leftPriority - rightPriority
          // although what we have is more explicit, but there is also missing return 0 in the end
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
    // sortedBalances don't seem to be depending on "prices" as it is, so we don't need it
    // in useMemo's dependency array
  }, [balances, prices]);

  // i would chain this .map call to a .sort in previous calculation, so that it also
  // benefits from useMemo
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // in this particular case I wouldn't extract the rendering of rows into const rows,
  // although it doesn't affect performance
  // it also should map over formattedBalances in the current implementation
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          // if a more reliable key existed, i'd use it, like balanceId,
          // or if balances are unique for each currency we can use balance.currency
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    },
  );

  return <div {...rest}>{rows}</div>;
};
