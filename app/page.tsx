import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Main from "@/components/Visualizer/Main";
export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Main />
    </main>
  );
}
