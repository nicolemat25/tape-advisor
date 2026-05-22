import { useState, useRef, useEffect } from "react";

const KNOWLEDGE_BASE = "GU\u00cdA DE LECTURA DEL TAPE C\u00f3mo leer el flujo de \u00f3rdenes en tiempo real Level II \u00b7 Order Book \u00b7 Ejecuciones \u00b7 Spread 1. Compradores vs. Vendedores en el Level II El Level II muestra en tiempo real qui\u00e9n quiere comprar y qui\u00e9n quiere vender una acci\u00f3n, y a qu\u00e9 precio. Es la ventana al libro de \u00f3rdenes real del mercado. \ud83d\udcc9 COMPRADORES \u2014 BID (Izquierda) \ud83d\udcc8 VENDEDORES \u2014 ASK (Derecha) \u00d3rdenes de compra esperando ser ejecutadas \u00d3rdenes de venta esperando ser ejecutadas Quieren pagar el precio m\u00e1s bajo posible Quieren cobrar el precio m\u00e1s alto posible Cuanto m\u00e1s alto el bid, m\u00e1s agresivo el comprador Cuanto m\u00e1s bajo el ask, m\u00e1s agresivo el vendedor Presi\u00f3n compradora \u2192 el precio tiende a subir Presi\u00f3n vendedora \u2192 el precio tiende a bajar Ejemplo real \u2014 ORCL (\\$186.83) As\u00ed se ve\u00eda el Level II en un momento dado: Exchange BID (Comprador) Tama\u00f1o Exchange ASK (Vendedor) Tama\u00f1o NSDQ \\$187.90 10 EDGX \\$188.00 500 ARCA \\$187.60 100 NSDQ \\$188.20 4 BATS \\$187.55 100 ARCA \\$188.38 200 EDGX \\$187.50 100 BATS \\$196.00 100 \u00bfQu\u00e9 comunica el tama\u00f1o (size)? EDGX tiene 500 unidades a \\$188.00 en el ask \u2192 pared vendedora visible. El precio puede tener dificultad para superar ese nivel. NSDQ tiene solo 10 unidades en el bid \u2192 poco soporte comprador en ese nivel. La clave no es solo qui\u00e9n est\u00e1, sino qui\u00e9n se mueve primero: si los compradores retiran sus bids \u2192 precio cae. Si los vendedores retiran sus asks \u2192 precio sube r\u00e1pido. 2. El Spread El spread es la diferencia entre el mejor precio de compra (bid) y el mejor precio de venta (ask). Es el coste impl\u00edcito de entrar al mercado. Mejor BID \\$187.90 (NSDQ) Mejor ASK \\$188.00 (EDGX) SPREAD = \\$0.10 Interpretaci\u00f3n del spread Escenario Spread Se\u00f1al Bid \\$100 / Ask \\$100.01 \\$0.01 \u2014 muy tight Alta liquidez \u2705 Bid \\$100 / Ask \\$101 \\$1.00 \u2014 amplio Baja liquidez \u26a0\ufe0f Bid \\$100 / Ask \\$120 \\$20 \u2014 extremo Sin liquidez \ud83d\udeab \u00bfPor qu\u00e9 alguien compra con spread amplio? Cuando un operador compra con un spread grande, est\u00e1 aceptando un coste de entrada elevado. Esto es una se\u00f1al importante: Tiene urgencia de entrar \u2192 no le importa el deslizamiento Anticipa un movimiento r\u00e1pido y fuerte \u2192 el spread es irrelevante vs. la ganancia esperada Es institucional \u2192 necesita ejecutar un size grande y no puede esperar En el tape, una ejecuci\u00f3n grande con spread amplio sugiere convicci\u00f3n. El operador est\u00e1 arriesgando m\u00e1s para entrar ahora. 3. El Order Book El order book muestra todas las \u00f3rdenes pendientes en el mercado, no solo las mejores. Permite identificar d\u00f3nde est\u00e1 concentrado el inter\u00e9s comprador y vendedor. BID SIZE ASK SIZE \\$80.00 64 \\$81.00 200 \\$79.00 27 \\$81.00 11 \\$67.00 3 \\$82.00 73 \\$66.00 180 \\$83.00 900 Se\u00f1ales clave en el order book Concentraci\u00f3n de tama\u00f1o en un nivel = soporte o resistencia fuerte (ej: \\$83 con 900 en ask) Tama\u00f1o peque\u00f1o disperso = poco inter\u00e9s institucional, precio puede moverse f\u00e1cilmente Si un nivel con mucho size desaparece de golpe \u2192 posible trampa o retirada t\u00e1ctica (spoofing) Comparar el total de bids vs. total de asks da una idea de la presi\u00f3n neta del mercado 4. La Ejecuci\u00f3n (Tape / Time &amp; Sales) La ejecuci\u00f3n es el momento en que una orden se ejecuta realmente. En el tape (Time &amp; Sales) vemos cada transacci\u00f3n: precio, tama\u00f1o y si fue en el bid o en el ask. Ejecutado EN el Ask Ejecutado EN el Bid Se\u00f1al Comprador agresivo pag\u00f3 el precio del vendedor Vendedor agresivo acept\u00f3 el precio del comprador Tono alcista vs. bajista Aparece en verde en el tape Aparece en rojo en el tape Color = direcci\u00f3n de la agresi\u00f3n Ejemplo: Price \\$100 \u00b7 Size 2 Una ejecuci\u00f3n a \\$100 con solo 2 contratos parece peque\u00f1a. Pero preg\u00fantate: \u00bfSe ejecut\u00f3 en el ask? \u2192 alguien quiso entrar urgente aunque sea con 2 \u00bfViene despu\u00e9s de una serie de ejecuciones verdes? \u2192 acumulaci\u00f3n progresiva \u00bfEl size crece de 2 a 10 a 50 consecutivamente? \u2192 momentum institucional activ\u00e1ndose 5. Proceso Completo \u2014 C\u00f3mo Leer el Tape Sigue este proceso cada vez que entres a analizar un contrato o acci\u00f3n: Paso 1: Identifica el contrato de inter\u00e9s Busca el activo que quieres seguir. Puede venir de: Unusual options activity (alto OI, IV &gt; 69%, DTE 90+) Un setup t\u00e9cnico relevante (soporte, resistencia, VWAP) Un evento de catalizador (earnings, noticias, macro) Paso 2: Analiza el Spread (Bid\u2013Ask) Antes de mirar nada m\u00e1s, eval\u00faa el spread: Spread apretado (\\$0.01\u2013\\$0.05) \u2192 mercado l\u00edquido, buenas condiciones para operar Spread amplio (\\$1+) \u2192 baja liquidez, mayor riesgo de deslizamiento (slippage) Si alguien cruza un spread amplio con mucho size \u2192 se\u00f1al de convicci\u00f3n institucional Paso 3: Lee el Order Book Observa d\u00f3nde est\u00e1 concentrado el inter\u00e9s: \u00bfHay un nivel con size dominante en el ask? \u2192 resistencia. El precio podr\u00eda frenar ah\u00ed \u00bfHay mucho size en el bid? \u2192 soporte. Hay compradores dispuestos a absorber el papel Si ese size desaparece de golpe \u2192 posible spoofing (trampa). No conf\u00edes en \u00e9l ciegamente Compara el total de bids vs. total de asks: el lado m\u00e1s pesado indica la presi\u00f3n dominante Paso 4: Observa las Ejecuciones (Tape) Ahora mira el Time &amp; Sales: Ejecuciones verdes grandes y consecutivas \u2192 compradores agresivos, presi\u00f3n alcista Ejecuciones rojas grandes consecutivas \u2192 vendedores agresivos, presi\u00f3n bajista Mezcla de verde y rojo sin tama\u00f1o dominante \u2192 mercado indeciso, mejor esperar Un size muy grande en una sola ejecuci\u00f3n \u2192 posible bloque institucional Paso 5: Confirma con el contexto t\u00e9cnico El tape no opera en el vac\u00edo. Comb\u00ednalo con: VWAP / AVWAP \u2192 \u00bfel precio est\u00e1 por encima o por debajo del precio medio institucional? Volume Profile \u2192 \u00bfen qu\u00e9 zona de precio ha habido m\u00e1s actividad hist\u00f3ricamente? Open Interest de opciones \u2192 \u00bfhay mucho OI en un strike cercano? Eso puede actuar como im\u00e1n o barrera Si el tape confirma lo que el nivel t\u00e9cnico sugiere \u2192 se\u00f1al de alta probabilidad 6. Resumen R\u00e1pido \u2014 Tabla de Referencia Lo que ves Se\u00f1al Acci\u00f3n a considerar Bid size &gt;&gt; Ask size Presi\u00f3n compradora dominante Buscar entrada larga Ask size &gt;&gt; Bid size Presi\u00f3n vendedora dominante Buscar entrada corta o salir Ejecuciones verdes grandes Compradores agresivos Momentum alcista activo Ejecuciones rojas grandes Vendedores agresivos Momentum bajista activo Spread muy amplio Baja liquidez Operar con precauci\u00f3n Size grande en un nivel desaparece Posible spoofing No confiar, esperar confirmaci\u00f3n Bloque grande en el tape + nivel t\u00e9cnico Se\u00f1al institucional confirmada Alta probabilidad de continuaci\u00f3n 7. An\u00e1lisis del Option Chain en Thinkorswim El Option Chain en thinkorswim permite leer el mercado de opciones antes de operar. El objetivo es detectar desbalances entre calls y puts, identificar d\u00f3nde est\u00e1 la liquidez real y entender por qu\u00e9 un lado cuesta m\u00e1s que el otro. Anatom\u00eda del Option Chain \u2014 Calls vs. Puts \ud83d\udcc8 CALLS (lado izquierdo) \ud83d\udcc9 PUTS (lado derecho) Apostando a que la acci\u00f3n SUBE Apostando a que la acci\u00f3n BAJA Delta positivo (0 a +1) Delta negativo (0 a -1) Columnas: BID / ASK / DELTA (izquierda del strike) Columnas: BID / ASK / DELTA (derecha del strike) El Delta y el Desbalance Call/Put El delta mide cu\u00e1nto se mueve el precio del contrato por cada \\$1 que sube o baja la acci\u00f3n. Los contratos m\u00e1s informativos son los que est\u00e1n ATM (At The Money) e ITM (In The Money) , es decir, con delta entre 0.40 y 0.60. Ejemplo del Option Chain para strike \\$90: CALL BID CALL ASK CALL \u0394 STRIKE PUT BID PUT ASK 6.00 6.50 0.50 \\$90 7.00 7.90 Se\u00f1al de desbalance: La CALL tiene delta 0.50 y la PUT tiene delta 0.54 \u2014 diferencia de 0.04. Eso significa que el mercado est\u00e1 pagando m\u00e1s por protecci\u00f3n bajista (puts) que por upside (calls). Los contratos est\u00e1n desbalanceados: el put est\u00e1 cotizando con m\u00e1s prima, lo que refleja sesgo bajista o mayor demanda de cobertura. En condiciones perfectamente equilibradas, el delta de la call y el put ATM deber\u00edan ser sim\u00e9tricos (ambos ~0.50). Una diferencia significativa (&gt;0.04) indica que uno de los lados est\u00e1 siendo m\u00e1s demandado o que la IV es asim\u00e9trica. IV (Implied Volatility) \u2014 Por qu\u00e9 un lado cuesta m\u00e1s La IV refleja cu\u00e1nta volatilidad est\u00e1 descontando el mercado en ese contrato. Si la IV de las puts es mayor que la de las calls en el mismo strike, significa que hay m\u00e1s demanda de cobertura bajista. Si pasa al rev\u00e9s, el mercado est\u00e1 pagando m\u00e1s por upside. Escenario IV Lo que indica Acci\u00f3n a tomar IV puts &gt; IV calls Sesgo bajista, m\u00e1s demanda de cobertura Precauci\u00f3n en entradas largas IV calls &gt; IV puts Sesgo alcista, m\u00e1s demanda de upside Confirma momentum alcista IV calls \u2248 IV puts Mercado equilibrado, sin se\u00f1al clara Esperar confirmaci\u00f3n de tape OI y Volumen \u2014 D\u00f3nde est\u00e1 la Liquidez Real El Open Interest (OI) y el Volumen son los dos indicadores de liquidez m\u00e1s importantes del Option Chain. No siempre apuntan en la misma direcci\u00f3n, y esa divergencia es la se\u00f1al m\u00e1s valiosa. OI Volumen Se\u00f1al Interpretaci\u00f3n Alto Alto Nivel confirmado \u2705 M\u00e1xima liquidez. Marcar en gr\u00e1fica como soporte/resistencia clave Alto Bajo Posici\u00f3n abierta sin actividad \u26a0\ufe0f Dinero estacionado ah\u00ed, sin movimiento reciente. Puede activarse Bajo Alto \ud83d\udd25 DESBALANCE ACTIVO Nuevo dinero entrando HOY. El mercado est\u00e1 apostando ah\u00ed ahora mismo C\u00f3mo Marcar la Liquidez en la Gr\u00e1fica Una vez identificados los niveles con m\u00e1s OI y volumen en el Option Chain, se trazan en la gr\u00e1fica como zonas de referencia. El precio tiende a gravitar hacia esos strikes o a rebotar en ellos. Strike con OI alto en calls \u2192 posible resistencia (techo). El precio puede frenar o rebotar ah\u00ed Strike con OI alto en puts \u2192 posible soporte (suelo). Hay cobertura compradora concentrada ah\u00ed Strike con alto volumen HOY (calls o puts) \u2192 marcar como nivel activo. Dinero nuevo entrando en esa zona Strike con OI alto en calls Y volumen alto en puts (o viceversa) \u2192 DESBALANCE. Ese nivel merece atenci\u00f3n especial: hay dinero apostando en contra de la posici\u00f3n establecida Rango de la acci\u00f3n: Los strikes con mayor OI tambi\u00e9n definen el rango esperado del mercado. El precio suele moverse entre el strike de mayor OI en calls (resistencia) y el de mayor OI en puts (soporte) durante la semana o el ciclo de expiraci\u00f3n. Ese es el campo de juego institucional. 8. Los 3 Tipos de Lectura del Tape El tape se lee en tres capas, en orden. Cada capa confirma o refuta lo que la anterior sugiere. # Tipo Qu\u00e9 te dice 1 Option Chain El lenguaje del mercado. Delta como medidor del sentimiento. Precio e IV revelan desbalances. Es la primera capa \u2014 te dice que algo va a pasar pero no la direcci\u00f3n. 2 Level 2 Liquidez vs. no liquidez. D\u00f3nde est\u00e1n los compradores y vendedores reales en este momento. Confirma o desmiente lo que el Option Chain suger\u00eda. 3 Time and Sales Las ejecuciones reales. La direcci\u00f3n confirmada. Se llen\u00f3 de una o en varios intentos. Es la \u00faltima capa y la m\u00e1s decisiva. 9. Los Mandamientos del Tape UNA INSTITUCI\u00d3N SIEMPRE, PERO SIEMPRE, HACE HEDGE Cuando ves una posici\u00f3n institucional grande, siempre hay una cobertura en alg\u00fan lugar. El hedge no tiene que estar en el mismo strike, ni en la misma expiraci\u00f3n, ni en la misma cuenta. Asegurar posiciones es como poner un seguro a la casa: siempre se hace. C\u00f3mo Identificar si una Orden es Hedge o Posici\u00f3n Principal Caracter\u00edstica Posici\u00f3n Principal Hedge (Cobertura) Delta .30 \u2014 .50 (ATM/ITM ligero) .10 \u2014 .15 (OTM, poco delta) Premium Alto. Es la apuesta principal. Menor. Es solo protecci\u00f3n. Funci\u00f3n Apostar a la direcci\u00f3n Stop loss impl\u00edcito si la posici\u00f3n se gira Delta puts hedge N/A -.10 a -.20 en puts Cuando veas un movimiento grande en puts, el primer paso es preguntarte: \u00bfEs hedge o es posici\u00f3n principal? Si el delta es -.10 a -.20 es casi seguro cobertura. Si el delta es -.30 o m\u00e1s, empieza a ser posici\u00f3n direccional. Calls vs Puts como Herramienta Direccional Los calls son la herramienta principal para leer direcci\u00f3n. Esto es porque en calls suele haber 6 o m\u00e1s strikes con delta relevante , dando mucho rango de lectura. En puts, solo hay 3 strikes \u00fatiles antes de que el delta sea tan bajo que la informaci\u00f3n pierde valor. Si el movimiento no ocurre dentro de esos 3 deltas, es mejor no tradear los puts. 10. C\u00f3mo Leer las Fechas de Expiraci\u00f3n (DTE) Las instituciones operan en ciclos de tiempo muy espec\u00edficos. El DTE (Days To Expiration) de un contrato te dice mucho sobre qui\u00e9n est\u00e1 detr\u00e1s de esa orden y qu\u00e9 tipo de movimiento est\u00e1n anticipando. DTE Qui\u00e9n suele operar aqu\u00ed \u00bfHedge habitual? Acci\u00f3n a tomar 90 d\u00edas Institucional puro. Ciclo trimestral. NO suelen hacer hedge aqu\u00ed Si ves movimiento \u2192 a\u00f1adir a watchlist inmediatamente. Es se\u00f1al institucional real. 60 d\u00edas Movimiento sectorial. Dinero rotando entre sectores. Posible. Verificar sector completo. Buscar las 5 empresas top del sector. Ver si el flujo (calls o puts) se repite en todas \u2192 confirma movimiento sectorial. 30 d\u00edas Mixto. Institucional y retail activos. Frecuente. M\u00e1s ruido. Verificar con el Option Chain y el tape. M\u00e1s f\u00e1cil confundir hedge con posici\u00f3n. Regla de los 90 d\u00edas: Es un ciclo trimestral. Las instituciones usan ese rango para planificar posiciones completas. Si ves flujo en 90 d\u00edas es casi siempre posici\u00f3n direccional, no cobertura. Es la se\u00f1al de mayor calidad que puedes encontrar en el tape. 11. Horarios de Mercado y Sesiones Clave El mercado no es igual en todos sus horarios. Hay momentos con liquidez institucional real y momentos de ruido. Saber cu\u00e1ndo operar es tan importante como saber qu\u00e9 operar. Sesi\u00f3n Horario (ET) Qui\u00e9n opera Qu\u00e9 ocurre Pre-market 4:00 AM \u2013 9:30 AM Solo EEUU (algunos brokers) Baja liquidez. Movimientos exagerados con poco volumen. \u00datil para leer direcci\u00f3n pero peligroso para operar. Apertura 9:30 \u2013 10:30 AM Todo el mundo. Bancos, instituciones, retail. La sesi\u00f3n mas importante. Los bancos establecen la liquidez del dia. Maxima atencion al tape aqui. Mediodia 11:30 AM \u2013 2:30 PM Bancos entre si. Poco retail. Intercambio interbancario. Movimientos lentos, menos senal. Evitar salvo senal muy clara. Cierre 3:00 \u2013 4:00 PM Instituciones cerrando o anadiendo posiciones. Segunda ventana de alta liquidez. Los que entraron por la manana cierran o anaden. Maxima atencion a partir de las 3:30 PM. Las dos ventanas de oro: 9:30-10:30 AM y 3:00-4:00 PM. En esos dos momentos los bancos establecen y cierran posiciones. El tape tiene mas senal, mas volumen real y menos ruido. Si solo puedes operar en una ventana, que sea la apertura. 12. Modulo 3 - Analisis de la Grafica del Contrato La grafica del contrato te dice si el trade ya se dio o no. Cuando ves una orden grande en el tape, la grafica del contrato te muestra si ese movimiento ya ocurrio y esta agotado, o si acaba de empezar y hay recorrido. No es lo mismo entrar en un contrato que ya subio un 300% que en uno que acaba de activarse. Que buscar en la grafica del contrato Lo que ves en la grafica Que significa Accion Contrato plano, luego spike de volumen reciente Trade acaba de activarse. Recorrido potencial. Alta probabilidad de entrada Contrato ya subio 200-400% desde la entrada original El trade ya se dio. Movimiento agotado. No entrar. Buscar otro contrato. Volumen constante, precio lateral, sin pico Acumulacion en curso. Posicion construyendose. Vigilar. Anadir a watchlist y esperar activacion. Nota: Analiza la grafica del contrato en el mismo timeframe que la orden que viste en el tape. Si la orden entro hoy, mira el grafico de 1 dia con velas de 5 minutos. Si entro hace semanas, mira el grafico diario. 13. Tipos de Transacciones en el Tape Tipo Que indica Como usarlo DELTA Mucho movimiento pero en acumulacion. El dinero esta entrando pero el precio no ha explotado aun. Leer el desbalance entre calls y puts. Ver en que direccion se acumula mas delta. SPREAD Apalancamiento sobre un trade ejecutado en el ask de una gran institucion. El comprador paga el precio del vendedor sin negociar. Confirma que hay urgencia. El comprador no quiso esperar al bid. Senal de conviccion. TIME &amp; SALES Orden agresiva. Ejecucion directa, sin esperar. Es el tipo mas directo de senal de direccion. Ver si se lleno de una sola vez o en varios intentos. Un solo fill = conviccion. Varios intentos = acumulacion gradual. Golden Sweep GOLDEN SWEEP = \\$1,000,000 o mas en premium en una sola orden Es la senal de mayor peso en el tape. Cuando ves un millon de dolares ejecutado en un solo contrato, hay una institucion con conviccion total detras. No es retail, no es hedge pequeno. Es una apuesta direccional de primer nivel. Volumenes Minimos para Day Trading Si ves un volumen en la grafica del contrato despues de las 10 AM, presta atencion. El umbral minimo para considerar una senal valida para day trading es: Volumen en grafica Precio contrato aprox. Size Premium total \\$400K \\$1,000 por contrato 5 contratos \\$50,000 \\$200K \\$200 por contrato 1-2 contratos \\$50,000 14. Opening Tape y Setup Diario OPENING TAPE: 9:30 AM - 10:00 AM Solo aplica para Day Trading. El Opening Tape tiene mucha actividad y diferenciar movimiento Call vs Put puede ser complicado. No te preocupes si ves volumenes exagerados en este periodo \u2014 pueden ser ordenes de apertura de ese momento, no senales direccionales de largo plazo. Analisis de Open Tape (9:30-9:50 AM): Si en esa ventana ves volumen fuerte en contratos con Delta .55-.80, indica un movimiento hacia esa direccion. Es la primera senal del dia. Setup Diario \u2014 Proceso Paso a Paso Ejemplo con GOOG a \\$121. Este es el proceso completo cada manana antes de operar: 1 Monthly / Expiraci\u00f3n mas cercana \u2014 Strikes ATM Ir al option chain del contrato mensual o el que esta a punto de expirar. Buscar los strikes mas cercanos al precio actual. Buscar volumenes grandes y abrir 3 graficas en thinkorswim: la accion, el call del strike, y el put del mismo strike. 2 Weekly \u2014 Contraste de sentimiento Ir al weekly para crear un contraste entre el sentimiento de la semana y lo que estan haciendo las instituciones. Buscar deltas mayores a .40. Estar pendiente de la grafica de esos contratos para ver volumenes inusuales. Observar discrepancias entre volumenes de calls y puts del mismo strike. 3 Discrepancia = senal Si el volumen en calls es muy diferente al de puts en el mismo strike, hay desbalance activo. Eso es lo que vas a tradear. Confirmar con el tape (Time and Sales) antes de entrar. 4 Grafica del contrato + Opening Tape A las 9:30 AM abrir el tape. Si entre 9:30-9:50 AM ves volumen fuerte en contratos con delta .55-.80 en la misma direccion que el desbalance que identificaste antes de abrir \u2014 esa es tu confirmacion para entrar. Importante sobre el Opening Tape: Los volumenes exagerados que ves en la apertura no significan nada por si solos. Son normales en ese periodo. Lo que importa es si coinciden con el desbalance que ya identificaste en el option chain antes de abrir. Si coinciden, la senal es valida. Si no, ignorar. 15. Flujo Inusual, Ejecucion y Calculo del Target Filtro de la Manana \u2014 Flujos Inusuales En las primeras horas solo analizo flujos inusuales de millones o miles con delta +.55 porque indica direccion. Verificar siempre que no esten tradeando para ambos lados al mismo tiempo \u2014 si hay flujo fuerte en calls Y en puts del mismo strike, puede ser un strangle o hedge, no una apuesta direccional. El analisis de Open Tape (9:30-9:50 AM) confirma o desmiente lo que viste antes de abrir. Si en esa ventana aparece volumen fuerte en contratos con delta .55-.80 en la misma direccion del desbalance previo \u2014 la senal es valida. Reglas de Entrada \u2014 Como Usar el Contrato ITM 01 Contrato de ejecucion Usar el contrato ITM donde viste la ejecucion institucional como tu contrato de entrada. Verificar que el strike este siendo utilizado MAS ARRIBA \u2014 es decir, que haya actividad en strikes superiores que confirmen la direccion. 02 Target por volumen Usar el mismo contrato ITM de la ejecucion para entrar al trade. Verificar que strike price estan usando como target (donde hay volumen mas arriba). Ejemplo: ejecucion inicial en Call 390 y ves alto volumen en los Call 400 \u2014 el Call 400 es tu target de salida. Calculo del Punto de Salida Cuando ves un movimiento fuerte, por ejemplo en los Calls 120, hay dos escenarios posibles para determinar tu salida: Escenario A \u2014 Target visible en el tape Escenario B \u2014 Sin actividad arriba Se tradea una cantidad similar de dinero en un strike mas arriba \u2014 por ejemplo Call 122 con volumen equivalente. Ese strike con volumen ES tu punto de salida. El mercado te esta diciendo hasta donde quiere ir. No hay volumen en strikes superiores. Calcular el punto de salida usando los deltas. Si entraste en delta .50, tu recorrido esperado termina cuando el delta llegue a .65-.70. Ese es el momento de evaluar salida. Regla del delta de salida: Si ejecutaste en delta .50, el recorrido natural lleva el contrato hacia delta .65-.70. Ahi empieza a ser ITM profundo y el valor temporal se reduce. Evalua salida en esa zona salvo que haya un target de volumen visible mas arriba que justifique mantener. Referencia rapida de delta entrada vs. salida: Delta de entrada Zona de salida por delta Nota .50 (ATM) .65 \u2014 .70 Recorrido normal. Evaluar salida aqui salvo target visible. .55 \u2014 .60 .70 \u2014 .75 Buen recorrido. Si hay target arriba, mantener hasta ese nivel. .65 \u2014 .80 .80 \u2014 .85+ Contrato muy ITM. Poco valor temporal. Salida inminente o target confirmado arriba. Prioridad: Siempre busca primero el target por volumen visible en el tape (Escenario A). Es mas preciso. El calculo por delta (Escenario B) es el plan de respaldo cuando no hay actividad en strikes superiores que indique hasta donde quiere ir el mercado. 16. Duracion del Trade y Eleccion del Contrato La eleccion del contrato debe alinearse con la duracion esperada del trade. El theta (decaimiento del tiempo) penaliza los contratos a corto plazo muy rapido \u2014 si usas el contrato equivocado, el tiempo trabaja en tu contra aunque tengas razon en la direccion. Duracion del trade Contrato a usar Por que Menos de 2 horas Diario o esa misma semana (weekly) Day trade. El theta no da tiempo a destruir mucho valor en pocas horas. Mas de 2 horas / varios dias Mensual Swing. El theta influye mucho en contratos de pocos dias. El mensual da margen para que el movimiento se desarrolle. Respetar siempre la duracion del trade. Si el movimiento institucional que viste es para 2-3 dias y usas un contrato semanal que expira manana, el theta puede destruir el valor del contrato antes de que el movimiento ocurra aunque tengas razon en la direccion. 17. Mid Day Tape (10 AM - 1 PM / 4 PM - 7 PM Espana) El Tape mas interesante, pero el mas peligroso y confuso. Se usa para 2 cosas: Day Trading y Swing Trading. IMPORTANTE: Mid Tape es el peor momento de liquidez del dia. Si hay una ejecucion grande a esta hora es MUY MUY interesante \u2014 precisamente porque no hay liquidez, quien entra aqui sabe lo que va a pasar. Interpretacion segun Delta en Mid Tape Delta Tipo Que hacer .70 - .80 Swing activo La institucion sabe que el movimiento se va a dar. A baja liquidez y delta alto \u2014 conviction total. Puede que en 20-30 min se de un movimiento. Buscar el hedge (generalmente puts con delta .30 o menos, distinta fecha de expiracion, misma hora). Si el call tiene mas volumen que el put = direccional alcista pero mas riesgo. Si estan balanceados = no hay direccion clara. .45 - .60 Esperar OI Menos agresivo. Puede ser que se esten ubicando para swing. Esperar a ver el Open Interest al dia siguiente. Si se refleja en OI hay movimiento en los proximos dias. Este trade lleva hedge SI O SI. Lo mas complejo: nunca sabras 100% las intenciones. Lo mejor es esperar a que cierre el dia y confirmar en OI. .35 - .30 Lottery ticket Solo monthlys. Delta muy bajo = OTM profundo. Alto riesgo, alto potencial si hay movimiento grande. No para swing normal. Como Identificar el Hedge en Mid Tape Cual es el hedge El trade esta balanceado? Si el trade principal es en calls, el hedge generalmente son puts. Si es en puts, el hedge son calls. Se ejecutan generalmente a la misma hora pero con diferente fecha de expiracion. Delta del hedge: .30 o menos. Confirmarlo en el tape de la accion entera, no del contrato individual. Las instituciones tradean mensual. Call tiene mas volumen que put: Direccional alcista, mayor riesgo asumido. Calls y puts balanceados: No hay direccion clara. No operar. 18. Closing Tape (3 PM - 4 PM) El Closing Tape es para Swing Trading, no para Day Trading. Aunque veas una ejecucion agresiva o alto volumen, NO deberias entrar rapidamente. Tomate el tiempo para analizar, especialmente si es un contrato a mas de 30 dias de expiracion. Los movimientos grandes al cierre pueden indicar urgencia institucional y reflejarse al dia siguiente. Pero antes de entrar siempre verificar el Open Interest overnight. Analisis Overnight \u2014 La Clave del Closing Tape Pregunta OI NO subio al dia siguiente OI SI subio al dia siguiente El volumen del closing se le anado al OI? Stay away from the trade. Posiblemente el movimiento ya ocurrio y el volumen que viste es todo de cierre de posiciones previas. No hay trade nuevo. Buscar confirmacion y montar el trade. La posicion quedo abierta. Va a haber movimiento en los proximos dias. Tomarse el tiempo de analizar \u2014 especialmente si son contratos a mas de 30 dias. Darse hasta una semana para ver como se desarrolla antes de entrar. Regla del tiempo de analisis: Para contratos a mas de 30 dias, las instituciones van acumulando posicion gradualmente. No hay urgencia de entrar el mismo dia. Darte hasta una semana para observar, confirmar el OI, ver si sigue entrando flujo, y montar el trade con conviccion antes de que ocurra el movimiento. 19. Modulo 4 \u2014 Como Construir un Trade El objetivo es invertir \\$1,000 y convertirlos en \\$15,000-\\$20,000. Esto no ocurre todos los dias y no es facil. Para lograrlo hay que comportarse diferente \u2014 seguir el dinero inteligente, no el ruido. Proceso Paso a Paso para Construir un Trade 1 Option Chain \u2014 Buscar desbalance de delta Si hay desbalance: movimiento pendiente claro. Si no hay desbalance: mas trabajo de analisis en el tape. Ver calls y puts del mismo strike. Tomar screenshot de Today Option Statistics para saber donde se esta moviendo el dinero. 2 Grafica del contrato vs grafica de la accion Verificar si el movimiento a partir de la ejecucion que vi ya paso en el price action de la accion. Ver los DOS lados: spread vs single leg, y verificar siempre el delta. Abrir el chart del contrato y el de la accion lado a lado para ver donde entro el dinero. 3 Cuando ocurrio la transaccion Opening Tape = Day Trading. Mid Tape = verificar o esperar 10-30 min para saber si es swing. Closing Tape = Swing. Abrir la accion al lado y ver el movimiento de precio a esa hora para identificar patrones. 4 Verificar en Fidelity Ver la hora exacta y si fue continua (sweep) o fragmentada. Verificar si a esa hora habia liquidez en el Level 2. Si no habia liquidez y ejecutaron mas de 5 millones: estan atrapados en la posicion \u2014 alta probabilidad de que el trade se de. Calcular el premium real: Size x Precio de ejecucion = inversion total. 5 Times and Sales Verificar que orden fue la que se ejecuto. Buscar agresividad, liquidez y spread. Separar retail de institucional en el analisis. Cuanto Dinero Importa \u2014 Umbral de Atencion Formula: Size de la orden x Precio de ejecucion = Inversion total real Premium Nivel de atencion Nota \\$100K No necesariamente importante Puede ser retail. No actuar solo por esto. \\$500K Mucha atencion Prestarle mucha atencion, especialmente si es a mas de 60 dias de expiracion. \\$1,000,000+ SKIN ON THE GAME Lo que estamos buscando. Alguien con conviction total. Esta es la senal de mayor peso \u2014 analizar con todos los pasos anteriores. 20. Leyenda de Deltas \u2014 Unraveling the Deltas Esta es la leyenda de referencia para interpretar cualquier ejecucion en el tape. Aplica tanto a calls como a puts. Es el mapa que clasifica a quien esta detras de cada movimiento y con que intencion. Delta Calls Puts Que significa / Notas .10 NO TIENE FUNCIONALIDAD NO TIENE FUNCIONALIDAD EXCEPCION: Si ves \\$20-30M aqui es VENTA DE PRIMA. Los fondos arriesgan \\$2M para ganar \\$500K con 98% probabilidad. No importa si sube o baja, ganan con el tiempo. Ver si el OI/volumen se fue acumulando en el tiempo o entro de golpe. .20 Hedge / *Lotto Hedge Principalmente cobertura. Puede ser Lotto en calls (*). El .10 es para venta de prima de fondos con alta probabilidad. .30-.40 Hedge / Lotto Hedge / *Lotto Zona de transicion entre hedge y posicion real. Solo monthlys para delta .35-.30. En 30 dias: verificar si es hedge o directional usando la leyenda. .50-.60 TAPE ZONE \u2014 La zona mas importante Aqui es donde se lee el tape. Es donde los contratos tienen suficiente valor temporal y suficiente sensibilidad al precio para ser utiles. Si la ejecucion no ocurre en esta zona, requiere verificacion adicional. Es el corazon del analisis. .70 Smart Move Smart Move Cuidado si se da en Mid Tape \u2014 no a primera hora. Buscar hedge obligatoriamente, especialmente si es a mas de 60 dias. El hedge generalmente se hace en el mismo momento con diferente expiracion. Cuando ves movimientos grandes a .70, esperar unos dias para ver si el movimiento no se da antes de entrar. .80 Directional Directional Muy bueno para meterse. Entrar a la posicion con stop loss y hedge (tipo 2-3 millones). El delta ya es ITM solido \u2014 el contrato se comporta casi como la accion. .90-1.00 Aggressive Aggressive Maxima conviccion. El contrato se mueve casi 1:1 con la accion. Costo similar a comprar acciones pero sin riesgo de tiempo. Pregunta clave: por que una institucion arriesgaria quedarse pillada aqui si no sabe que el movimiento se va a dar? 21. Como Ejecutar: Hedge Personal y Fechas de Expiracion El Hedge Personal \u2014 Como Proteger tu Posicion El hedge es un extintor en una casa que se acaba de prender en fuego. No es opcional \u2014 es la diferencia entre perder un poco y explotar la cuenta. Ejemplo practico \u2014 NVDA call 400 con la accion en 405, expiracion a 38 dias: Componente Posicion Direccional (larga) Hedge (cobertura) Expiracion Proxima fecha de expiracion: mas de 60 dias Menos de 30 dias \u2014 vender contra varios contratos o comprar puts Delta .50 - .60 (trade direccional) .20 (hedge con puts o calls contrarios) Pasos Antes de Ejecutar \u2014 Analisis por Fecha de Expiracion 90 dias Si ves \\$10M+ aqui no hay prisa. Esperar a que el trade madure. Ciclo trimestral \u2014 las instituciones saben que tienen tiempo. Darte hasta una semana para analizar antes de entrar. 60 dias Verificar agresividad. Buscar un fondo que invierta mas de \\$1,000,000 para poder identificar la direccion. Corroborar el sector entero buscando las 5 companias top del sector. 30 dias Verificar si es hedge o directional. Usar la leyenda de deltas. Tener cuidado \u2014 puede ser cualquiera. Buscar en el option chain para clasificarlo usando los rangos de delta. La Orden Escondida (Hidden Order) Una orden escondida es una ejecucion en Mid Price con delta mayor a .70. El problema es que nunca sabes la intencion exacta. Proceso para identificarla: una vez veas esa ejecucion, verifica si a la misma hora hubo una transaccion SIMILAR en el lado opuesto con delta en rango .20-.30. Para hacerlo mas rapido, usa el area de volumen del option chain. Sentimiento: Retail vs Institucional Dinero NO Inteligente (Retail) Dinero Inteligente (Institucional) Sentimiento OTM. Opera por emocion. El Market Maker sabe lo que retail esta pensando y usa esa informacion para moverlos al lado equivocado. Sirve para saber donde NO ir. Sentimiento ITM. Sabe la direccion. Siempre hace hedge. Opera con logica y datos. Es lo que seguimos. Cuando hay mucho movimiento ITM direccional el movimiento real es en esa direccion. Siempre corroborar: Cuando recojas datos, tener una parte de retail y otra de institucional. El sentimiento de retail te dice donde el MM quiere que la gente se posicione. El flujo institucional ITM te dice donde va realmente el dinero. 22. Las Capas de la Cebolla \u2014 El Marco Final El proceso completo de analisis funciona como una cebolla: hay capas que rodean el nucleo. El core es lo mas importante, y cada capa exterior es contexto que rodea y refuerza lo que esta en el centro. Se trabaja de afuera hacia adentro hasta llegar a la ejecucion. Capa Nombre Que es / Que haces en esta capa EXTERIOR EXECUTION La capa mas exterior. Es donde finalmente ejecutas el trade. Solo llegas aqui despues de haber procesado todas las capas interiores. Sin ese proceso, ejecutar es especulacion pura. 5 MONITORING Vigilancia continua del mercado. Watchlist activa. Seguimiento de OI, volumen y precio en las posiciones identificadas. Aqui se construye el contexto antes de profundizar. Sabes que algo esta pasando pero aun no sabes que. 4 MIXED INFORMATION Combinacion de senales: flujo de opciones, Level II, volumen de acciones, sentimiento de retail e institucional mezclados. Aqui empiezas a separar el ruido de la senal. Es la capa mas confusa \u2014 todo parece importante pero tienes que filtrar. 3 NEWS \u2014 NARRATIVE El contexto narrativo del mercado: earnings, macro, geopolitica (China, Japon, Fed). La narrativa explica POR QUE el dinero esta donde esta. Tambien es donde el Market Maker construye el relato para mover a retail. Ojo: la narrativa puede ser una trampa. 2 CROSS INFORMATION SECTOR Confirmacion sectorial. Lo que ves en una compania lo buscas en las otras 4-5 del mismo sector. Si el flujo institucional se repite en todo el sector, la senal es mucho mas fuerte que si solo ocurre en una compania. Esto es lo que diferencia una apuesta de un trade con base. CORE DATA INFORMATION EL NUCLEO. Los datos puros: Option Chain, delta, OI, volumen, IV, Time and Sales. Todo lo que has aprendido en este curso. Es la unica informacion que no miente. Las noticias se pueden manipular, la narrativa se puede falsear. Los datos del tape son la realidad. Como Usar las Capas en la Practica 1 Monitoring \u2014 Watchlist activa. Ves una accion con movimiento inusual. La anades. 2 Mixed Information \u2014 Abres el option chain. Ves desbalance. Miras el tape. Mezclas senales. 3 News \u2014 Narrative \u2014 Buscas el contexto: hay earnings proximos, geopolitica relevante, sector en movimiento? Esto explica el POR QUE del flujo. Pero no lo sigues ciegamente \u2014 el tape manda. 4 Cross Information Sector \u2014 Buscas las otras 4-5 companias del sector. Si el flujo se repite, la senal se multiplica. Si no se repite, puede ser solo una posicion aislada. 5 Data Information (CORE) \u2014 Delta, OI, volumen, IV, tape. Aqui confirmas o descartas. Si el dato puro confirma lo que viste en las capas exteriores \u2014 ejecutas. GO EXECUTION \u2014 Todas las capas alineadas. Entras con conviccion, con tu contrato ITM identificado, con tu hedge preparado, con tu target definido por volumen o por delta, y con el tamano de posicion correcto. La clave del sistema: No ejecutas hasta que el core lo confirma. Las capas exteriores te dan contexto. El core te da certeza. Cuando todo converge \u2014 la narrativa, el sector, y los datos puros del tape \u2014 tienes un trade de alta probabilidad. Comportate como alguien diferente. El dinero esta ahi todos los dias. La pregunta es si tienes el proceso para verlo. 23. Beyond the Tape \u2014 El Proceso Completo Semanal Este es el proceso que se ejecuta el domingo por la noche o fuera del horario de mercado. Analizar maxmo 1-2 acciones en profundidad. El objetivo es llegar al lunes con el trade ya construido, no improvisarlo. Regla de riesgo: Arriesgar el 2% de la cuenta para participar de un crecimiento de 30-200%. Paso 1 \u2014 Recolectar la Data A. Option Chain Delta + Volumen o Open Interest \u2014 Buscar de mas lejos a mas cerca (primero 90 dias, luego 60, luego 30). El delta habla de probabilidad \u2014 delta .10 es 10% de probabilidad de terminar ITM. Cuanto dinero puede ganar o perder esa persona. Desbalance: Si o No. Ejemplo: 10,000 contratos intercambiados entre delta .50-.60. Nadie usa .60 para venta de prima \u2014 es posicion direccional. B. Grafica del Contrato El movimiento ya se dio o no? En que tape ocurrio: Opening, Mid o Closing. Observar tambien donde estaba la compania (precio, contexto) cuando se ingreso el dinero inusual. C. Time and Sales Size (3,000 o 5,000 contratos) \u00b7 Inversion (\\$10,000,000) \u00b7 Ask o Bid (compra agresiva o venta). Fue un sweep continuo o fragmentado. D. Liquidez Sin liquidez + ejecucion MID: Big Player. Gran institucion fuera de los mercados financieros normales. Ej: Bid \\$90 / Ask \\$95 ejecutado en \\$93 = MID. Alta probabilidad de que el trade se de. Con liquidez: ir despacio porque hay informacion que aun no conocemos. Que es un Movimiento Inusual Una compania donde su tape normalmente no es tan activo, pero durante los pasados dias o meses hemos visto actividad por encima de lo normal. Los softwares modernos (como Market Chameleon) lo marcan automaticamente. Senales de inusual: El volumen total de contratos excede el Open Interest \u2014 nuevo dinero neto entrando El premium fue inusualmente alto para esa compania La IV sube sin evento conocido que lo justifique Concentracion en 1-2 contratos del 20% o mas del volumen total del dia Compromiso: Tirarle screenshot a las companias que estoy investigando por si un dia el volumen total de los contratos excede lo habitual y no se ha dado un movimiento \u2014 porque de seguro va a pasar algo. Paso 2 \u2014 Cross Sector Information Hacerlo a principio de cada mes. Si veo algo muy interesante en META, verificar si en el sector de comunicaciones (y en tech y discretionaries) hay otras companias con el mismo movimiento. Si entraron \\$10M en META, ver si hicieron lo mismo en MSFT y AAPL. Top 3 Sectores Ganadores Top 3 Sectores Perdedores 1. Tech \u2014 Top 3 Companias 2. Communication \u2014 Top 3 Companias 3. Discretionaries \u2014 Top 3 Companias 1. Utilities 2. Energy 3. Health Care Ojo: Por mas que veas algo perfecto en una compania, si el resto del sector esta en baja no van a permitir que suba sola. El sector manda para los siguientes dias. Paso 3 \u2014 Noticias vs. Tape Hay noticias en contra de lo que vi en el tape? No hay nadie hablando de esto? Estar pendiente durante 3 dias. Entrar en monitoring trade \u2014 contrato pequeno para seguirlo sin arri";

const SYSTEM_PROMPT = `Eres el Tape Reading Advisor, un asistente especializado en lectura del tape, opciones financieras y análisis de flujo institucional. 

Tu conocimiento está basado exclusivamente en esta guía de trading:

${KNOWLEDGE_BASE}

INSTRUCCIONES:
- Responde SIEMPRE en español
- Sé directo y práctico — da respuestas accionables como lo haría un trader experimentado
- Cuando analices una situación, sigue el proceso de las capas de la cebolla: data → sector → noticias → ejecución
- Usa la leyenda de deltas como referencia clave
- Si alguien menciona una situación específica (delta, DTE, premio, tape), aplica el proceso del curso
- No inventes información fuera del contexto de la guía
- Cuando sea relevante, menciona qué sección del proceso corresponde (Opening/Mid/Closing tape, leyenda de deltas, etc.)
- Sé conciso pero completo. Máximo 200 palabras por respuesta salvo que se pida análisis profundo.`;

const SUGGESTIONS = [
  "Veo un movimiento en delta .70 en mid tape con $2M — ¿qué hago?",
  "¿Cómo diferencio un hedge de una posición direccional?",
  "¿Qué significa que el OI no subió al día siguiente?",
  "Explícame la leyenda de deltas completa",
  "¿Cuándo uso mensual vs semanal?",
  "¿Qué es un Golden Sweep?",
];

export default function TapeAdvisor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    setStarted(true);

    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-ipc": "true",
          },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Error al procesar respuesta.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Courier New', monospace",
      color: "#e0e0e0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1a1a2e",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#0d0d18",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          width: 36, height: 36,
          background: "linear-gradient(135deg, #00ff88, #0099ff)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: "bold", color: "#000",
          flexShrink: 0,
        }}>T</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", letterSpacing: "0.05em" }}>
            TAPE ADVISOR
          </div>
          <div style={{ fontSize: 11, color: "#00ff88", letterSpacing: "0.1em" }}>
            TAPE READING BOOTCAMP · ACTIVO
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}/>
          <span style={{ fontSize: 11, color: "#666", letterSpacing: "0.08em" }}>EN LÍNEA</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", maxWidth: 760, width: "100%", margin: "0 auto" }}>

        {/* Welcome screen */}
        {!started && (
          <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
            <div style={{
              fontSize: 48,
              background: "linear-gradient(135deg, #00ff88, #0099ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}>◎</div>
            <h1 style={{ fontSize: 22, color: "#fff", margin: "0 0 8px", letterSpacing: "0.08em" }}>
              TAPE READING ADVISOR
            </h1>
            <p style={{ color: "#666", fontSize: 13, margin: "0 0 36px", lineHeight: 1.6 }}>
              Tu asistente personal basado en el bootcamp completo.<br/>
              Pregunta sobre delta, tape, opciones, hedge, expiraciones.
            </p>

            <div style={{ display: "grid", gap: 10, maxWidth: 580, margin: "0 auto" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{
                  background: "#0d0d18",
                  border: "1px solid #1a1a2e",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#aaa",
                  fontSize: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  letterSpacing: "0.02em",
                  transition: "all 0.15s",
                  lineHeight: 1.4,
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "#00ff8844"; e.target.style.color = "#fff"; e.target.style.background = "#111"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#1a1a2e"; e.target.style.color = "#aaa"; e.target.style.background = "#0d0d18"; }}
                >
                  <span style={{ color: "#00ff8866", marginRight: 8 }}>→</span>{s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: m.role === "user" ? "row-reverse" : "row",
            gap: 10,
            alignItems: "flex-start",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: "bold",
              background: m.role === "user" ? "#1a1a2e" : "linear-gradient(135deg, #00ff88, #0099ff)",
              color: m.role === "user" ? "#666" : "#000",
              border: m.role === "user" ? "1px solid #2a2a3e" : "none",
            }}>
              {m.role === "user" ? "YO" : "T"}
            </div>
            <div style={{
              maxWidth: "80%",
              background: m.role === "user" ? "#111" : "#0d0d18",
              border: `1px solid ${m.role === "user" ? "#1a1a2e" : "#0f2a1a"}`,
              borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
              padding: "12px 16px",
              fontSize: 13,
              lineHeight: 1.7,
              color: m.role === "user" ? "#ccc" : "#e8e8e8",
              whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #00ff88, #0099ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: "bold", color: "#000", flexShrink: 0,
            }}>T</div>
            <div style={{
              background: "#0d0d18", border: "1px solid #0f2a1a",
              borderRadius: "4px 12px 12px 12px", padding: "14px 18px",
              display: "flex", gap: 6, alignItems: "center",
            }}>
              {[0,1,2].map(n => (
                <div key={n} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#00ff88",
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${n * 0.2}s`,
                  opacity: 0.6,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid #1a1a2e",
        padding: "16px",
        background: "#0d0d18",
        position: "sticky",
        bottom: 0,
      }}>
        <div style={{
          maxWidth: 760, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pregunta sobre delta, tape, opciones, hedge..."
            rows={1}
            style={{
              flex: 1,
              background: "#111",
              border: "1px solid #1a1a2e",
              borderRadius: 10,
              padding: "12px 14px",
              color: "#e0e0e0",
              fontSize: 13,
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
              minHeight: 44,
              maxHeight: 120,
              overflowY: "auto",
              transition: "border-color 0.15s",
            }}
            onFocus={e => e.target.style.borderColor = "#00ff8844"}
            onBlur={e => e.target.style.borderColor = "#1a1a2e"}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44,
              borderRadius: 10,
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #00ff88, #0099ff)"
                : "#1a1a2e",
              border: "none",
              cursor: input.trim() && !loading ? "pointer" : "default",
              color: input.trim() && !loading ? "#000" : "#333",
              fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            ↑
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#333", marginTop: 8, letterSpacing: "0.06em" }}>
          ENTER para enviar · SHIFT+ENTER para nueva línea
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a1a2e; border-radius: 2px; }
        textarea::placeholder { color: #333; }
      `}</style>
    </div>
  );
}
