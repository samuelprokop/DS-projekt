USE autodiely_eshop;

CREATE TABLE IF NOT EXISTS autodiely_eshop.users (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS autodiely_eshop.products (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  cta TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(512),
  manufacturer JSON,
  bestseller BOOLEAN DEFAULT FALSE,
  category VARCHAR(100),
  subCategory JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;



INSERT INTO users (_id, name, email, password) VALUES
(1, 'admin', 'admin@admin.com', '$2b$10$qlqgTMltcvk7aAtxQ5MSR.qZZz5R2I6zcYexiBJRBIRLBvNnYK9vq'),
(2, 'testuser', 'test123@test.com', '$2b$10$YIXk8pNj/5MMosKql5wsWe0euwNB7z6QD2Dzzb8uLul.RwVSBaO6W'),
(3, 'admin', 'me@admin.com', '$2b$10$KZHaLEoU8Ie3DD3gSuJ0qOd/r3CN2ReiQsUKPMoYzeHziv0AVVbuG'),
(4, 'me', 'me@me.com', '$2b$10$yTbsyiNNdIYfLjSmHPa/ZeoOLOGAIlDoKAI/BzRvVykxJssZtgRPO');

INSERT INTO products (_id, name, description, cta, price, image_url, manufacturer, bestseller, category, subCategory) VALUES
	('1', 'Alternátor', 'Vysoko kvalitný alternátor pre spoľahlivé dobíjanie batérie. Kompatibilný s viacerými európskymi značkami.', 'Najlepší alternátor za najlepšiu cenu!', '75.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690248/lfkrgh8sxw56wf0hm7iu.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('2', 'Brzdová kvapalina', 'Vysoko kvalitná brzdová kvapalina s vysokým bodom varu. Zabezpečuje spoľahlivé brzdenie.', 'Bezpečnosť na prvom mieste s našou brzdovou kvapalinou!', '5.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690384/hbxtrlq4vqqnl5zu8kiz.webp', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('3', 'Brzdové doštičky', 'Výkonné brzdové doštičky s dlhou životnosťou. Poskytujú optimálnu brzdnú silu a tichý chod.', 'Bezpečná jazda začína kvalitnými brzdovými doštičkami!', '12.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690435/uvoumvhr3emur0kn5pxt.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('4', 'Brzdové kotúče', 'Odolné brzdové kotúče s vynikajúcou odvodňovacou schopnosťou. Znížená hlučnosť a minimálne vibrácie.', 'Kvalitné brzdové kotúče pre bezpečné brzdenie za skvelú cenu!', '48.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690472/vooxorxsjtfjfqqqfzui.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('5', 'Čistič bŕzd', 'Efektívny čistič pre dokonalú čistotu brzdových komponentov. Odstraňuje mastnotu a nečistoty.', 'Udržujte svoje brzdy v perfektnom stave!', '2.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690599/hjtj9up3bxgi2wxgnlyu.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('6', 'Čistič interiéru', 'Efektívny čistič pre dokonalú hygienu interiéru vášho auta. Odstraňuje nečistoty a zápachy.', 'Čistý interiér za bezkonkurenčnú cenu!', '2.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690651/ch5jwcqt6qclevxs8gnw.png', '["Universal"]', '1', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('7', 'Chladiaca kvapalina', 'Vysoko účinná chladiaca kvapalina s protimrazovými vlastnosťami. Chráni motor pred prehriatím.', 'Optimálna teplota motora po celý rok!', '12.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690702/p3r91ehnja0bg1bxtdwf.webp', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('8', 'Chladič', 'Efektívny chladič motoru s optimalizovaným odvodom tepla. Vhodný pre náročné prevádzkové podmienky.', 'Udržte váš motor v optimálnej teplote s našim chladičom!', '134.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690739/vyktdmmckwk00rttdti3.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('9', 'DPF filter', 'Vysokoúčinný DPF filter pre čisté emisie. Dlhá životnosť a jednoduchá údržba.', 'Ekologická jazda s našim DPF filtrom za výhodnú cenu!', '329.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690781/pzy2yxfva590sfu1biru.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('10', 'Hlavný brzdový valec', 'Presne opracovaný brzdový valec s dokonalou tesnosťou. Dlhá životnosť a spoľahlivá funkcia.', 'Dokonalé brzdenie s našim hlavným brzdovým valcom!', '20.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690829/gkyoexo6p59jljnmtb1x.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('11', 'Katalyzátor', 'Vysokoúčinný katalyzátor pre čisté emisie. Odolný voči vysokým teplotám a korózii.', 'Ekologická jazda s našim katalyzátorom!', '29.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690922/vrkc9wwhnwjmuloxiaei.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('12', 'Ochrana proti korózii', 'Vysoko účinná ochrana karosérie pred koróziou. Vytvára trvanlivú ochrannú vrstvu.', 'Chráňte svoje auto pred hrdzavením za výhodnú cenu!', '9.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743690974/qfkbrel4qtnrxdcjcnyt.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('13', 'Olejový filter', 'Efektívny olejový filter s vysokou priepustnosťou. Zachytáva aj najmenšie nečistoty z oleja.', 'Čistý olej znamená dlhšiu životnosť motora!', '4.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691015/irknt70jzsdkounrb712.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('14', 'Palivové čerpadlo', 'Výkonné palivové čerpadlo s konštantným tlakom. Zabezpečuje optimálne spaľovanie.', 'Dokonalý prívod paliva do vášho motora!', '29.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691149/wwmyabbteshfdx8wnp71.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('15', 'Palivový filter', 'Vysokoúčinný palivový filter pre čisté palivo. Chráni vstrekovací systém pred nečistotami.', 'Zabezpečte si optimálny výkon motora s našim palivovým filtrom!', '1.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691256/ky8xkslkpd3ib77bglzw.jpg', '["Universal"]', '1', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('16', 'Impregnácia pneumatík', 'Vysoko účinná impregnácia pre dlhšiu životnosť pneumatík. Chráni pred prasknutím a starnutím.', 'Dlhšia životnosť pneumatík s našou impregnáciou!', '12.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691392/lzxbjtxbqjatubm1eyhd.png', '["Universal"]', '1', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('17', 'Katalyzátor', 'Vysokoúčinný katalyzátor pre čisté emisie. Odolný voči vysokým teplotám a korózii.', 'Ekologická jazda s našim katalyzátorom!', '29.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691509/zqzfn28mhoajmmclenle.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('18', 'Klinový remeň', 'Odolný klinový remeň s vynikajúcou prispôsobivosťou. Znížené riziko preklzovania a tichý chod.', 'Spoľahlivý klinový remeň za bezkonkurenčnú cenu!', '6.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691576/nkpa3q900sftquhdxzl1.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('19', 'Kolesové ložisko', 'Presné kolesové ložisko s nízkym trením. Odolné voči zaťaženiu a nepriaznivým podmienkam.', 'Plynulá jazda s našimi kolesovými ložiskami!', '11.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691661/s0zcfhxrgqyyrhftl84t.webp', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('20', 'Kľukový hriadeľ', 'Presne vyvážený kľukový hriadeľ s vysokou odolnosťou. Minimalizuje vibrácie motora.', 'Spoľahlivý základ vášho motora za výhodnú cenu!', '1249.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691716/cposardpzdkumxlc9hve.png', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('21', 'Kryt motora', 'Odolný kryt motora chrániaci pred nečistotami a vplyvmi počasia. Jednoduchá inštalácia a údržba.', 'Chráňte svoj motor s našim krytom!', '49.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691915/if5n3qxf7wusuhihozcg.png', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('22', 'Lambda sonda', 'Presná lambda sonda pre optimálne spaľovanie. Znižuje spotrebu paliva a emisie.', 'Maximálny výkon motora s našou lambda sondou!', '49.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743691996/a66tyngsqyxac5lehsbw.png', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('23', 'Ložisko kľukového hriadeľa', 'Vysoko kvalitné ložisko s nízkym trením. Odolné voči extrémnym zaťaženiam a vysokým teplotám.', 'Plynulý chod motora s našim ložiskom kľukového hriadeľa!', '12.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692067/s1yeakumtgt0aivrm7ph.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('24', 'Motorový olej 10W-40', 'Vysokokvalitný syntetický olej pre optimálnu ochranu motora. Znižuje opotrebenie a predlžuje životnosť.', 'Najlepšia starostlivosť o váš motor za skvelú cenu!', '29.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692130/ffqsd9blildhhjdpek4t.jpg', '["Universal"]', '1', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('25', 'Ochrana proti korózii', 'Chráňte svoje auto pred hrdzavením za výhodnú cenu!', 'Chráňte svoje auto pred hrdzavením za výhodnú cenu!', '9.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692228/llqquyn78tsyksr44lls.jpg', '["Universal"]', '1', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('26', 'Rozvodová reťaz', 'Presná rozvodová reťaz s vynikajúcou odolnosťou. Minimalizuje opotrebenie a hluk.', 'Spoľahlivý časovací mechanizmus za výhodnú cenu!', '32.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692471/be1aestiyeql8nbdoadz.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('27', 'Spojková sada', 'Kompletná spojková sada s vysokým krútiacim momentom. Hladké radenie a dlhá životnosť.', 'Dokonalý prenos výkonu s našou spojkovou sadou!', '459.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692589/qm7m8izkxw4zb4b0fsz8.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('28', 'Stieračová guma (pár)', 'Kvalitné stieračové gumy s dokonalým priliehaním. Odstraňujú vodu bez šmúh a škrabancov. (nie zo Škody, čiže nehučí po dvoch zotretiach)', 'Čisté čelné sklo za každého počasia!', '0.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692657/wmzwqlgyjw6o15c3xveg.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('29', 'Svetlomet (ľavý)', 'Výkonný svetlomet s optimálnym rozptylom svetla. Dlhá životnosť a jednoduchá inštalácia.', 'Bezpečná jazda v noci s našimi svetlometmi!', '149.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692732/voe34cceefmro3g1tb6u.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('30', 'Svetlomet (pravý)', 'Výkonný svetlomet s optimálnym rozptylom svetla. Dlhá životnosť a jednoduchá inštalácia.', 'Bezpečná jazda v noci s našimi svetlometmi!', '149.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692779/npxzlsl1bywx2wvamkd0.webp', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('31', 'Štartér', 'Výkonný štartér s rýchlym a spoľahlivým štartovaním. Odolný voči vysokým teplotám.', 'Rýchly štart za každého počasia s našim štartérom!', '99.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692854/mnzckzey9t87rfahja5a.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('32', 'Štartovacie káble', 'Silné štartovacie káble s výbornou vodivosťou. Bezpečné a odolné voči extrémnym podmienkam.', 'Nenechajte sa zastihnúť vybitou batériou - vždy pripravení s našimi káblami!', '10.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692932/g5jofw99ce32zt4gblxv.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('33', 'Tlmič pruženia', 'Kvalitný tlmič pruženia pre pohodlnú jazdu. Znižuje vibrácie a zlepšuje stabilitu vozidla.', 'Pohodlná jazda s našimi tlmičmi pruženia!', '75.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743692961/knhykqucrsy13pxauyov.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('34', 'Turbo kompresor', 'Výkonný turbo kompresor pre zvýšenie výkonu motora. Rýchla reakcia a dlhá životnosť.', 'Extra výkon pre váš motor s našim turbo kompresorom!', '199.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693004/zpotkqfmnwydbmbjbask.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('35', 'Vodná pumpa', 'Spoľahlivá vodná pumpa pre efektívnu cirkuláciu chladiacej kvapaliny. Tichý chod a dlhá životnosť.', 'Udržte váš motor v optimálnej teplote s našou vodnou pumpou!', '45.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693119/ihmzq5eejcryitktzbat.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('36', 'Vosk na karosériu', 'Vysoko kvalitný vosk vytvárajúci ochrannú vrstvu na karosérii. Dodáva lesk a chráni farbu.', 'Dokonalý lesk a ochrana pre vaše auto!', '9.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693156/n0svh6oggwetgo6ag4dw.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('37', 'Vstrekovacie čerpadlo', 'Výkonné vstrekovacie čerpadlo s presným dávkovaním paliva. Znižuje spotrebu a emisie.', 'Maximálna účinnosť motora s našim vstrekovacím čerpadlom!', '459.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693251/zfoe35t5fvgs7vlnwc7x.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('38', 'Vzduchový filter', 'Vysokoúčinný vzduchový filter pre čistý prívod vzduchu. Chráni motor pred nečistotami.', 'Čistý vzduch pre váš motor za skvelú cenu!', '6.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693294/ij2qjqmwf98ghmstpdvg.jpg', '["Universal"]', '0', 'prislusenstvo', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('39', 'Zapaľovacia cievka', 'Vysoko kvalitná zapalovacia cievka so stabilným výkonom. Zaisťuje silnú iskru pre optimálne spaľovanie.', 'Dokonalé spaľovanie s našou zapalovacou cievkou!', '25.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693332/ydvmgjfdyu9bcc1rzzoc.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]'),
	('40', 'Zapaľovacia sviečka', 'Vysoko kvalitná zapaľovacia sviečka s perfektným spaľovaním. Znižuje spotrebu paliva.', 'Optimálny výkon motora s našimi zapaľovacími sviečkami!', '2.99', 'https://res.cloudinary.com/dc7asmr3a/image/upload/v1743693372/q2ehawuqsvkq37n3po25.jpg', '["Audi", "BMW", "Ford", "Honda", "Mercedes", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo"]', '0', 'nahradne_diely', '["Bánska Bystrica", "Bratislava", "Handlová", "Košice", "Liptovský Mikuláš", "Nitra", "Nové Zámky", "Poprad", "Prešov", "Prievidza", "Rožňava", "Senec", "Trenčín", "Zvolen", "Online"]');

CREATE TABLE IF NOT EXISTS autodiely_eshop.cart (
  _id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (_id),
  FOREIGN KEY (user_id) REFERENCES autodiely_eshop.users(_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id) ON DELETE CASCADE,
  UNIQUE KEY user_product_manufacturer (user_id, product_id, manufacturer)
) ENGINE=InnoDB;

CREATE TABLE autodiely_eshop.orders (
    order_number VARCHAR(50) PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    items JSON NOT NULL COMMENT 'Stores array of {product_id, manufacturer, quantity} objects',
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Order Placed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_orders (user_id)
);


CREATE TABLE IF NOT EXISTS autodiely_eshop.ke_branch (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255),
  qty INT NOT NULL DEFAULT 0,
  manufacturer JSON,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS autodiely_eshop.bl_branch (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255),
  qty INT NOT NULL DEFAULT 0,
  manufacturer JSON,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS autodiely_eshop.pp_branch (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255),
  qty INT NOT NULL DEFAULT 0,
  manufacturer JSON,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS autodiely_eshop.nr_branch (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255),
  qty INT NOT NULL DEFAULT 0,
  manufacturer JSON,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS autodiely_eshop.sc_branch (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255),
  qty INT NOT NULL DEFAULT 0,
  manufacturer JSON,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

ALTER TABLE autodiely_eshop.ke_branch MODIFY manufacturer VARCHAR(255);
ALTER TABLE autodiely_eshop.bl_branch MODIFY manufacturer VARCHAR(255);
ALTER TABLE autodiely_eshop.pp_branch MODIFY manufacturer VARCHAR(255);
ALTER TABLE autodiely_eshop.nr_branch MODIFY manufacturer VARCHAR(255);
ALTER TABLE autodiely_eshop.sc_branch MODIFY manufacturer VARCHAR(255);

CREATE TABLE autodiely_eshop.branch_orders (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  branch VARCHAR(2) NOT NULL,
  order_number VARCHAR(20) NOT NULL UNIQUE,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  notes TEXT,
  FOREIGN KEY (product_id) REFERENCES autodiely_eshop.products(_id)
);


