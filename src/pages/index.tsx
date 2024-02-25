import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { OverviewTable } from "@/components/OverviewTable";
import Charted from "@/components/ChartComponent";
import App from "@/components/TestChart";
import SearchBar from "@/components/Searchbar";
import InjectiveChart from "@/components/InjectiveChart";

const overview = () => {
  const [selected, setSelected] = useState<string>("all");

  const allClicked = () => {
    setSelected("all");
  };

  const ethClicked = () => {
    setSelected("eth");
  };

  const injClicked = () => {
    setSelected("inj");
  };

  const [totalTVL, setTotalTVL] = useState<string>();
  const [stable, setStable] = useState<string>();
  const [volume, setVolume] = useState<string>();
  const [funding, setFunding] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        const response4 = await axios.get("https://api.llama.fi/v2/chains");
        const chains = response4.data;

        const injective = chains.find(
          (chain: any) => chain.gecko_id === "injective-protocol"
        );
        const injectiveTvl = injective.tvl;

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const dojoswapId = "3965";
        const hydroprotocolId = "4084";
        const astroportId = "3117";
        const helixId = "2259";

        const dojoswap = protocols.find(
          (protocol: { id: string }) => protocol.id === dojoswapId
        );
        const totalTvlDojo = dojoswap.tvl;

        const hydro = protocols.find(
          (protocol: { id: string }) => protocol.id === hydroprotocolId
        );
        const totalTvlHydro = hydro.tvl;

        const astro = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const totalTvlAstro = astro.tvl;

        const helix = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const totalTvlHelix = helix.tvl;

        const value =
          totalTvlAstro + totalTvlDojo + totalTvlHelix + totalTvlHydro;
        const dex = totalTvlAstro + totalTvlDojo;
        const der = totalTvlHelix;
        const liq = totalTvlHydro;

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(injectiveTvl);

        setTotalTVL(formatted);

        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(dex);
        setStable(formatted2);

        const formatted3 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(der);
        setVolume(formatted3);

        const formatted4 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(liq);
        setFunding(formatted4);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      // setRefetch(!refetch);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-overview</div> */}

      <SearchBar />

      {/* button block
      <div className=" bg-black p-3 px-5 rounded-xl flex gap-4">
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={allClicked}>
          All
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={ethClicked}>
          ETH
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={injClicked}>
          INJ
        </button>
      </div> */}

      {/* graph card */}
      <div className="bg-black p-5 px-5 rounded-xl flex gap-5 justify-between">
        {/* left */}
        <div className="py-6 px-2 flex gap-2 flex-col w-1/3">
          <div className=" text-gray-400">Injective Total Value Locked</div>
          <div className=" text-4xl">{totalTVL}</div>
          <div className="flex justify-between pt-4">
            <div>Top Protocols TVL</div>
            <div>{stable}</div>
          </div>
          <div className="flex justify-between  ">
            <div>Volume</div>
            <div>{volume}</div>
          </div>
          <div className="flex justify-between  ">
            <div>Liquid Staking</div>
            <div>{funding}</div>
          </div>
        </div>

        {/* right */}
        <div className=" flex flex-col">
          {/* <Charted height={200} width={600} /> */}
          <div className=" px-10 text-xl">Injective Total value Locked </div>
          <InjectiveChart />
        </div>
      </div>

      {/* table options */}
      <OverviewTable />
    </div>
  );
};

export default overview;
