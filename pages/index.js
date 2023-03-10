import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [filmeInput, setFilmeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filme: filmeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      
      setResult(data.result);
      setFilmeInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Search Director</title>
        <link rel="icon" href="/filmadora.png" />
      </Head>

      <main className={styles.main}>
        <img src="/filmadora.png" className={styles.icon} />
        <h3>Nome do Diretor do Filme</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="filme"
            placeholder="Entre com um nome de Filme"
            value={filmeInput}
            onChange={(e) => setFilmeInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
          <p>Utilize nomes de filmes lançados até a data de Dez/2022</p>
        </form>
        <div className={styles.result}>{result}</div>
        <div className="power">
        <img src="/logo_openai.svg"  width={200} height={80}/>
      </div>
      </main>
      

    </div>
  );
}
