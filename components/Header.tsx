import Image from "next/image";
import header from "./Header.module.css";
import bf from "@/public/bf.svg";
import drop from "@/public/down.svg";
const Header = () => {
  return (
    <header className={header.head}>
      <section className={header.flex}>
        <Image src={bf} alt="bf" height={40} />
        <h1 className={header.headTitle}>BR&gt;INF+CK</h1>
        <h2 className={header.headSubTitle}>VISUALIZER</h2>
      </section>
      <section className={header.flex}>
        <div className={header.highWidthContainer}>
          <p>
            from {"<"}inharul{">"}
          </p>
        </div>
        <div className={header.lowWidthContainer}>
          <section className={header.flex}>
            <Image
              src={drop}
              alt="dropdown"
              height={32}
              style={{ fill: "#eee" }}
            />
          </section>
        </div>
      </section>
    </header>
  );
};

export default Header;
