import { HomeHeader } from "@components/home-header/home-header";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { BtnClasses, Button } from "@components/button/button";
import { Icon } from "@components/icon/icon";
import { byteIcons } from "@components/icon/icons-list";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.home_wrapper}>
      <HomeHeader />
      <section className={styles.banner}>
        <h1>
          Experimente mais liberdade no controle da sua vida financeira. Crie
          sua conta com a gente!
        </h1>
        <Image
          className={styles.image}
          src="/banner-illustration.svg"
          alt="Banners"
          width={800}
          height={500}
        />

        <Button
          click={() => router.push("/transactions")}
          text="Acessar Mock"
          btnClass={BtnClasses.HIGHLIGHT}
        />
      </section>

      <section className={styles.cards_section}>
        <h1>Vantagens do nosso sistema:</h1>
        <div className={styles.cards_container}>
          <div className={styles.card}>
            <Icon iconClass={styles.icon} iconKey="database" />
            <h2>Registros ilimitados</h2>
            <p>
              Organize suas transferências mensais sem complicações ou
              limitações.
            </p>
          </div>
          <div className={styles.card}>
            <Icon iconClass={styles.icon} iconKey="adjust" />
            <h2>Tenha total controle</h2>
            <p>
              Altere as informações dos registros a qualquer momento para
              atender às suas necessidades.
            </p>
          </div>
          <div className={styles.card}>
            <Icon iconClass={styles.icon} iconKey="organize" />
            <h2>Organize seus dados</h2>
            <p>
              Contamos com todas as simulações bancárias para calcular seus
              gastos e pendências.
            </p>
          </div>
          <div className={styles.card}>
            <Icon iconClass={styles.icon} iconKey="safety" />
            <h2>Segurança acima de tudo</h2>
            <p>
              Conte conosco para proteger suas informações sensíveis. Não
              divulgados seus dados em nenhum lugar!
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>Serviços</strong>
          <ul role="footerinfo">
            <li>Conta corrente</li>
            <li>Conta PJ</li>
            <li>Cartão de crédito</li>
          </ul>
        </div>
        <div>
          <strong>Contato</strong>
          <ul role="footerinfo">
            <li>0800 004 250 08</li>
            <li>meajuda@bytebank.com.br</li>
            <li>ouvidoria@bytebank.com.br</li>
          </ul>
        </div>
        <div>
          <strong>Desenvolvido por Lisandra Ferraz</strong>
          <ul role="footerinfo">
            <li>
              <Image
                src="/white-bytebank-logo.svg"
                alt="Logo Bytebank"
                width={120}
                height={40}
              />
            </li>
            <li>
              <span>
                <Icon iconKey="igIcon" />
              </span>
              <span>
                <Icon iconKey="waIcon" />
              </span>
              <span>
                <Icon iconKey="ytIcon" />
              </span>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
