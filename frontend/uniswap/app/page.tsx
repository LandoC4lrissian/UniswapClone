import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center bg-indigo-600 min-h-screen">
      <div className="container">
        <div className="header">
          <button className="active">Swap</button>
          <button>Sınır</button>
          <button>Göndermek</button>
          <button>Satın almak</button>
          <button className="settings">⚙️</button>
        </div>
        <div className="swapContainer">
          <div className="row">
            <input type="number" className="text-black" placeholder="0" />
            <select>
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <div className="arrow">⬇️</div>
          <div className="row">
            <input type="number" className="text-black" placeholder="0" />
            <select>
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <button className="connectWallet">Cüzdan bağlayın</button>
        </div>
        <div className="footer">
          Uniswap&apos;in mevcut olduğu yerler:{" "}
          <a href="https://uniswap.org">English</a>
        </div>
      </div>
    </main>
  );
}
