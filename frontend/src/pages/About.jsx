import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewsletterBox";

const About = () => {
  return (
    <div className="border-t pt-8">
      <div className="my-10 flex flex-col">
        <div className="flex flex-col md:flex-row gap-16 mb-8">
          <img
            className="w-full md:w-[450px] object-cover h-[400px] md:h-auto"
            src={assets.about_us}
          />
          <div className="flex flex-col justify-center md:w-2/4 text-gray-600">
            <div className="text-2xl mb-6">
              <Title text1={"ABOUT"} text2={" US"} />
            </div>
            <div>
              <p className="mb-4">
                Vítajte v <strong>Autodiely.sk</strong> - vašom dôveryhodnom
                zdroji kvalitných autodielov. Ponúkame široký výber náhradných
                dielov a tuningových súčiastok pre všetky značky áut. S dôrazom
                na kvalitu a dostupné ceny vám pomôžeme udržať vaše auto v
                perfektnom stave.
              </p>

              <div className="mt-8 mb-4">
                <b className="text-gray-800 text-lg">Our Mission</b>
              </div>
              <p>
                V Autodiely.sk veríme, že spoľahlivosť vášho auta začína
                kvalitnými dielmi. Naša misia je jednoduchá: dodávať overené
                autodiely, ktoré vám ušetria čas a starosti. Nech už potrebujete
                údržbu alebo špeciálny tuning, u nás nájdete presne to, čo váš
                voz potrebuje.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-2xl md:text-3xl mb-6">
            <Title text1={"WHY"} text2={" CHOOSE US"} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Kontrola kvality
              </h3>
              <p className="text-sm text-gray-600">
                Každý produkt dôkladne testujeme a overujeme, aby spĺňal naše
                prísne kvalitné štandardy.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Pohodlie
              </h3>
              <p className="text-sm text-gray-600">
                Jednoduché rozhranie a bezproblémový objednávkový proces -
                nakupovanie také ľahké ako nikdy predtým.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Zákaznícky servis
              </h3>
              <p className="text-sm text-gray-600">
                Naši skúsení odborníci sú vždy pripravení pomôcť - vaša
                spokojnosť je naša priorita.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <NewsletterBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
