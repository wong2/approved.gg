import { Loading, useToasts } from "@geist-ui/core";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { MARKETS } from "../consts";
import { useApprovedStatus } from "../hooks/use-approved-status";
import { useMutateApproved } from "../hooks/use-mutate-approved";

interface Props {
  address: string;
  contractAddress: string;
}

const ApprovedIconGroup: FC<Props> = (props) => {
  const { data: statuses, mutate } = useApprovedStatus(props.address, props.contractAddress);
  const { writeAsync } = useMutateApproved(props.contractAddress);
  const [pendingMap, setPendingMap] = useState<Record<string, boolean>>({});
  const { setToast } = useToasts({ placement: "topRight" });

  const setApprovalForAll = useCallback(
    async (market: typeof MARKETS[0], approved: boolean) => {
      setPendingMap((m) => ({ ...m, [market.contract]: true }));
      try {
        const tx = await writeAsync({ args: [market.contract, approved] });
        await tx.wait();
      } catch {
        setToast({
          text: `${approved ? "Approve" : "Revoke"} of ${market.name} failed`,
          type: "error",
          delay: 2000,
        });
        return;
      } finally {
        setPendingMap((m) => ({ ...m, [market.contract]: false }));
      }
      mutate();
      setToast({
        text: `${approved ? "Approve" : "Revoke"} of ${market.name} succeeded`,
        type: "success",
        delay: 2000,
      });
    },
    [mutate, setToast, writeAsync]
  );

  return (
    <div className="flex flex-row items-center gap-2 justify-center w-full">
      {statuses ? (
        MARKETS.map((market) => {
          const approved = statuses[market.name];
          return (
            <Image
              className={`cursor-pointer ${pendingMap[market.contract] ? "animate-spin" : ""}`}
              key={market.name}
              src={market.icons[approved ? 1 : 0]}
              width={20}
              height={20}
              alt={market.name}
              onClick={() => setApprovalForAll(market, !approved)}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ApprovedIconGroup;
