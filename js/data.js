/* Wordwise – Inhalte: Grammatikthemen (B1–C1) und Startpaket Vokabeln
   Übungstypen:
   gap   – Lücke füllen:        { t:'gap', q:'… ___ …', a:[Lösungen], ex }
   mc    – Auswahl:             { t:'mc', q, o:[Optionen], a:IndexRichtig, ex }
   err   – Fehler finden:       { t:'err', s:'Satz mit [falschem Teil]', fix:[Korrekturen], ex }
   order – Satz bauen:          { t:'order', de:'Deutsche Bedeutung', s:'Zielsatz', ex }
   trans – Umformen:            { t:'trans', q:'Anweisung', s:'Ausgangssatz', hint:'Satzanfang', a:[Lösungen], ex }
*/

const GRAMMAR = [
  {
    id: 'pp-ps', title: 'Present Perfect vs. Simple Past', level: 'B1',
    explain: `
<p><b>Simple Past</b> – abgeschlossene Handlung zu einem <b>bestimmten Zeitpunkt</b> in der Vergangenheit.<br>
Signalwörter: <i>yesterday, last week, in 2019, two days ago, when …</i></p>
<p class="ex">I <b>saw</b> him yesterday. · She <b>moved</b> to Hamburg in 2021.</p>
<p><b>Present Perfect</b> (have/has + 3. Form) – Vergangenheit mit <b>Bezug zur Gegenwart</b>, Zeitpunkt unbestimmt oder unwichtig, oder Zustand bis jetzt.<br>
Signalwörter: <i>ever, never, already, yet, just, so far, since, for</i></p>
<p class="ex">I <b>have</b> never <b>been</b> to Canada. · We <b>have lived</b> here since 2021.</p>
<div class="tip"><b>Typische Fehler aus dem Deutschen</b><br>
„Ich habe es gestern gemacht.“ → I <b>did</b> it yesterday (nicht: <s>have done</s>).<br>
„Ich wohne seit drei Jahren hier.“ → I <b>have lived / have been living</b> here for three years (nicht: <s>I live</s>).</div>`,
    items: [
      { t: 'gap', q: 'I ___ (see) that film last weekend.', a: ['saw'], ex: '„last weekend“ = bestimmter Zeitpunkt → Simple Past.' },
      { t: 'gap', q: 'I ___ (never / be) to Canada.', a: ['have never been'], ex: 'Erfahrung bis jetzt, ohne Zeitpunkt → Present Perfect.' },
      { t: 'gap', q: 'We ___ (live) in Hamburg since 2021.', a: ['have lived', 'have been living'], ex: '„since“ + Zustand bis jetzt → Present Perfect (Simple oder Continuous).' },
      { t: 'mc', q: 'When ___ your current job?', o: ['did you start', 'have you started', 'you started'], a: 0, ex: 'Fragen mit „when“ zielen auf einen Zeitpunkt → Simple Past.' },
      { t: 'mc', q: 'How long ___ each other?', o: ['have you known', 'do you know', 'are you knowing'], a: 0, ex: 'Zustand von früher bis jetzt → Present Perfect. „know“ ist ein State Verb und steht nicht in der Continuous-Form.' },
      { t: 'mc', q: 'Look! Someone ___ the window.', o: ['has broken', 'was breaking', 'had broken'], a: 0, ex: 'Ergebnis jetzt sichtbar → Present Perfect (im amerikanischen Englisch hört man hier auch „broke“).' },
      { t: 'err', s: 'I [have finished] my thesis two weeks ago.', fix: ['finished'], ex: '„two weeks ago“ = bestimmter Zeitpunkt → Simple Past.' },
      { t: 'err', s: 'I [know] him for ten years.', fix: ['have known'], ex: '„for ten years“ bis heute → Present Perfect, nicht Present Simple wie im Deutschen.' },
      { t: 'order', de: 'Warst du schon einmal in Schottland?', s: 'Have you ever been to Scotland?' },
      { t: 'trans', q: 'Formuliere mit „for“ um.', s: 'I started working here three years ago. I still work here.', hint: 'I … for three years.', a: ['I have worked here for three years.', 'I have been working here for three years.'], ex: 'Dauer bis jetzt → Present Perfect (Continuous) + for.' }
    ]
  },
  {
    id: 'ppc', title: 'Present Perfect Continuous', level: 'B1',
    explain: `
<p><b>have/has been + -ing</b> betont die <b>Dauer</b> einer Tätigkeit bis jetzt – oder eine gerade beendete Tätigkeit mit sichtbaren Folgen.</p>
<p class="ex">I<b>'ve been waiting</b> for twenty minutes. · You're out of breath – <b>have</b> you <b>been running</b>?</p>
<p><b>Present Perfect Simple</b> betont dagegen das <b>Ergebnis</b> oder eine <b>Anzahl</b> (how many / how much).</p>
<p class="ex">She <b>has written</b> three emails this morning.</p>
<div class="tip"><b>State Verbs</b> (know, like, believe, own, belong, understand …) stehen nicht in der Continuous-Form: I <b>have known</b> her for years.</div>`,
    items: [
      { t: 'gap', q: 'I ___ (wait) for the bus for twenty minutes.', a: ['have been waiting'], ex: 'Dauer bis jetzt → Present Perfect Continuous.' },
      { t: 'gap', q: 'She ___ (write) three emails this morning.', a: ['has written'], ex: 'Anzahl/Ergebnis → Present Perfect Simple.' },
      { t: 'mc', q: 'Your eyes are red. ___?', o: ['Have you been crying', 'Did you cry', 'Are you crying since'], a: 0, ex: 'Gerade beendete Tätigkeit mit sichtbarer Folge → Present Perfect Continuous.' },
      { t: 'mc', q: 'I ___ him since we were at school.', o: ['have known', 'have been knowing', 'know'], a: 0, ex: '„know“ ist ein State Verb → keine Continuous-Form.' },
      { t: 'mc', q: 'How long ___ English?', o: ['have you been learning', 'are you learning', 'do you learn'], a: 0, ex: 'Frage nach der Dauer bis jetzt → Present Perfect Continuous.' },
      { t: 'gap', q: 'They ___ (paint) the kitchen all day – and it still isn\'t finished.', a: ['have been painting'], ex: 'Tätigkeit mit Dauer, noch nicht abgeschlossen → Continuous.' },
      { t: 'err', s: 'I [have been reading] five chapters of the book today.', fix: ['have read'], ex: 'Eine Anzahl (five chapters) → Present Perfect Simple.' },
      { t: 'order', de: 'Es regnet seit heute Morgen.', s: 'It has been raining since this morning.' },
      { t: 'trans', q: 'Fasse zu einem Satz mit „for“ zusammen.', s: 'He started playing the guitar two hours ago. He is still playing.', hint: 'He … for two hours.', a: ['He has been playing the guitar for two hours.'], ex: 'Dauer einer andauernden Tätigkeit → Present Perfect Continuous.' }
    ]
  },
  {
    id: 'past-perfect', title: 'Past Perfect & Erzählzeiten', level: 'B2',
    explain: `
<p><b>Past Perfect</b> (had + 3. Form) – die „Vorvergangenheit“: eine Handlung liegt <b>vor</b> einer anderen vergangenen Handlung.</p>
<p class="ex">When we arrived, the train <b>had</b> already <b>left</b>.</p>
<p><b>Past Perfect Continuous</b> (had been + -ing) – Dauer bis zu einem Punkt in der Vergangenheit.</p>
<p class="ex">She was tired because she <b>had been working</b> all night.</p>
<p><b>Past Continuous</b> (was/were + -ing) – Hintergrundhandlung, die von einer anderen unterbrochen wird.</p>
<p class="ex">I <b>was cooking</b> when the phone <b>rang</b>.</p>
<div class="tip">Typische Signale: <i>by the time, already, before, after, never … before</i></div>`,
    items: [
      { t: 'gap', q: 'When we arrived at the station, the train ___ (already / leave).', a: ['had already left'], ex: 'Die Abfahrt liegt vor der Ankunft → Past Perfect.' },
      { t: 'gap', q: 'She was exhausted because she ___ (work) all night.', a: ['had been working', 'had worked'], ex: 'Dauer vor einem Zeitpunkt in der Vergangenheit → Past Perfect (Continuous).' },
      { t: 'mc', q: 'By the time I got home, my flatmate ___ all the pizza.', o: ['had eaten', 'ate', 'has eaten'], a: 0, ex: '„By the time“ + Vergangenheit → Past Perfect für die frühere Handlung.' },
      { t: 'mc', q: 'I ___ in the garden when it started to rain.', o: ['was working', 'had worked', 'have worked'], a: 0, ex: 'Unterbrochene Hintergrundhandlung → Past Continuous.' },
      { t: 'gap', q: 'I didn\'t recognise him because he ___ (grow) a beard.', a: ['had grown'], ex: 'Der Bart war schon vorher gewachsen → Past Perfect.' },
      { t: 'mc', q: 'How long ___ before you found a job?', o: ['had you been looking', 'have you looked', 'are you looking'], a: 0, ex: 'Dauer bis zu einem vergangenen Zeitpunkt → Past Perfect Continuous.' },
      { t: 'err', s: 'After she [has finished] her studies, she moved to London.', fix: ['had finished', 'finished'], ex: 'Erzählung in der Vergangenheit → Past Perfect (oder Simple Past nach „after“), kein Present Perfect.' },
      { t: 'order', de: 'Sie hatten noch nie zuvor Schnee gesehen.', s: 'They had never seen snow before.' },
      { t: 'trans', q: 'Verbinde die Sätze mit „because“.', s: 'First I lost my keys. Then I called a locksmith.', hint: 'I called a locksmith because …', a: ['I called a locksmith because I had lost my keys.'], ex: 'Die frühere Handlung steht im Past Perfect.' }
    ]
  },
  {
    id: 'future', title: 'Zukunft: will, going to & Co.', level: 'B1',
    explain: `
<p><b>will</b> – spontane Entscheidung, Versprechen, Vorhersage ohne konkreten Anlass.</p>
<p class="ex">The phone's ringing – I<b>'ll</b> get it. · I promise I<b>'ll</b> call you.</p>
<p><b>going to</b> – Absicht/Plan; Vorhersage mit sichtbarem Anzeichen.</p>
<p class="ex">I<b>'m going to</b> apply for the job. · Look at those clouds – it<b>'s going to</b> rain.</p>
<p><b>Present Continuous</b> – feste Verabredung. <b>Present Simple</b> – Fahrpläne, Programme.</p>
<p class="ex">I<b>'m meeting</b> Tom at six. · The train <b>leaves</b> at 7:45.</p>
<p><b>Future Continuous</b> (will be + -ing) – Handlung, die zu einem Zeitpunkt in der Zukunft im Gange ist.<br>
<b>Future Perfect</b> (will have + 3. Form) – bis zu einem Zeitpunkt in der Zukunft abgeschlossen (by …).</p>`,
    items: [
      { t: 'mc', q: 'The phone is ringing. – I ___ get it!', o: ['\'ll', '\'m going to', 'am getting to'], a: 0, ex: 'Spontane Entscheidung im Moment des Sprechens → will.' },
      { t: 'mc', q: 'Look at those clouds! It ___ rain.', o: ['is going to', 'will be', 'rains'], a: 0, ex: 'Vorhersage mit sichtbarem Anzeichen → going to.' },
      { t: 'mc', q: 'I ___ my dentist on Thursday at 10 – it\'s in my calendar.', o: ['\'m seeing', 'will see', 'see'], a: 0, ex: 'Feste Verabredung → Present Continuous.' },
      { t: 'mc', q: 'The train ___ at 7:45 tomorrow morning.', o: ['leaves', 'is going to leave', 'would leave'], a: 0, ex: 'Fahrplan → Present Simple.' },
      { t: 'gap', q: 'By the end of the year, I ___ (finish) my degree.', a: ['will have finished'], ex: '„By …“ in der Zukunft, dann abgeschlossen → Future Perfect.' },
      { t: 'gap', q: 'This time tomorrow I ___ (sit) on a plane to Lisbon.', a: ['will be sitting'], ex: 'Zu einem Zeitpunkt in der Zukunft im Gange → Future Continuous.' },
      { t: 'gap', q: 'I\'ve made my decision: I ___ (apply) for that job.', a: ['am going to apply'], ex: 'Vorher gefasste Absicht → going to.' },
      { t: 'err', s: 'I promise I [am calling] you tonight.', fix: ['will call'], ex: 'Versprechen → will.' },
      { t: 'order', de: 'Was machst du dieses Wochenende?', s: 'What are you doing this weekend?' }
    ]
  },
  {
    id: 'conditionals', title: 'If-Sätze (Conditionals 0–3)', level: 'B1',
    explain: `
<table class="gt">
<tr><th>Typ</th><th>if-Satz</th><th>Hauptsatz</th></tr>
<tr><td>0 – allgemein gültig</td><td>Present</td><td>Present</td></tr>
<tr><td>1 – real/möglich</td><td>Present</td><td>will + Infinitiv</td></tr>
<tr><td>2 – irreal Gegenwart</td><td>Past Simple</td><td>would + Infinitiv</td></tr>
<tr><td>3 – irreal Vergangenheit</td><td>Past Perfect</td><td>would have + 3. Form</td></tr></table>
<p class="ex">If you heat ice, it <b>melts</b>. · If it <b>rains</b>, we<b>'ll</b> stay in.<br>
If I <b>had</b> more time, I <b>would</b> learn Spanish. · If I <b>had known</b>, I <b>would have told</b> you.</p>
<div class="tip"><b>Kein will/would im if-Satz!</b> (anders als im Deutschen „wenn ich … würde“).<br>
<b>If I were you …</b> – „were“ für alle Personen ist die Standardform.<br>
<b>unless</b> = if … not.</div>`,
    items: [
      { t: 'gap', q: 'If it ___ (rain) tomorrow, we will stay at home.', a: ['rains'], ex: 'Typ 1: if + Present, Hauptsatz will.' },
      { t: 'gap', q: 'If I ___ (have) more time, I would learn Spanish.', a: ['had'], ex: 'Typ 2: if + Past Simple, Hauptsatz would.' },
      { t: 'gap', q: 'If she had studied harder, she ___ (pass) the exam.', a: ['would have passed'], ex: 'Typ 3: if + Past Perfect, Hauptsatz would have + 3. Form.' },
      { t: 'mc', q: 'If I ___ you, I would accept the offer.', o: ['were', 'am', 'would be'], a: 0, ex: 'Feste Wendung „If I were you“ (umgangssprachlich auch „was“).' },
      { t: 'mc', q: 'You won\'t get a seat ___ you book in advance.', o: ['unless', 'if', 'when'], a: 0, ex: '„unless“ = „if … not“: nur wenn du vorher buchst.' },
      { t: 'gap', q: 'If you heat ice, it ___ (melt).', a: ['melts'], ex: 'Typ 0: allgemein gültig → Present in beiden Satzteilen.' },
      { t: 'err', s: 'If I [would have known], I would have told you.', fix: ['had known'], ex: 'Kein would im if-Satz → Past Perfect.' },
      { t: 'trans', q: 'Bilde einen irrealen Bedingungssatz (Typ 2).', s: 'I don\'t have a car, so I can\'t drive to work.', hint: 'If I …', a: ['If I had a car, I could drive to work.', 'If I had a car, I would be able to drive to work.', 'If I had a car, I would drive to work.'], ex: 'Irreal in der Gegenwart → if + Past Simple, could/would + Infinitiv.' },
      { t: 'order', de: 'Was würdest du tun, wenn du im Lotto gewinnen würdest?', s: 'What would you do if you won the lottery?' }
    ]
  },
  {
    id: 'mixed-cond', title: 'Mixed Conditionals', level: 'C1',
    explain: `
<p>Mixed Conditionals verbinden Zeitebenen.</p>
<p><b>Vergangene Bedingung → Folge in der Gegenwart</b><br>if + Past Perfect, would + Infinitiv</p>
<p class="ex">If I <b>had taken</b> the job in Berlin, I <b>would be living</b> there now.</p>
<p><b>Dauerhafte (gegenwärtige) Bedingung → Folge in der Vergangenheit</b><br>if + Past Simple, would have + 3. Form</p>
<p class="ex">If he <b>were</b> more organised, he <b>wouldn't have missed</b> the deadline.</p>`,
    items: [
      { t: 'gap', q: 'If I had taken the job in Berlin, I ___ (live) there now.', a: ['would be living', 'would live'], ex: 'Vergangene Bedingung, Folge jetzt → would + Infinitiv.' },
      { t: 'gap', q: 'If she ___ (not / be) so shy, she would have spoken to him at the party.', a: ['were not', 'was not'], ex: 'Dauerhafte Eigenschaft (jetzt) → Past Simple im if-Satz.' },
      { t: 'mc', q: 'If I hadn\'t missed the bus, I ___ at work now.', o: ['would be', 'would have been', 'will be'], a: 0, ex: 'Folge in der Gegenwart („now“) → would + Infinitiv.' },
      { t: 'mc', q: 'If he were more organised, he ___ the deadline last week.', o: ['wouldn\'t have missed', 'wouldn\'t miss', 'didn\'t miss'], a: 0, ex: 'Folge in der Vergangenheit („last week“) → would have + 3. Form.' },
      { t: 'err', s: 'If I had studied medicine, I [would have been] a doctor now.', fix: ['would be'], ex: '„now“ → Folge in der Gegenwart: would be.' },
      { t: 'trans', q: 'Bilde einen Mixed Conditional.', s: 'I didn\'t save any money last year, so I can\'t afford a holiday now.', hint: 'If I had …', a: ['If I had saved some money last year, I could afford a holiday now.', 'If I had saved money last year, I could afford a holiday now.', 'If I had saved some money last year, I would be able to afford a holiday now.', 'If I had saved money last year, I would be able to afford a holiday now.'], ex: 'Vergangene Bedingung (Past Perfect) → Folge jetzt (could/would + Infinitiv).' },
      { t: 'order', de: 'Wenn du zugehört hättest, wüsstest du die Antwort.', s: 'If you had listened, you would know the answer.' }
    ]
  },
  {
    id: 'wish', title: 'Wish, If only & I\'d rather', level: 'B2',
    explain: `
<p><b>wish + Past Simple</b> – Bedauern über die Gegenwart.</p>
<p class="ex">I wish I <b>spoke</b> French. · I wish I <b>were</b> taller.</p>
<p><b>wish + Past Perfect</b> – Bedauern über die Vergangenheit.</p>
<p class="ex">I wish I <b>hadn't eaten</b> so much yesterday.</p>
<p><b>wish + would</b> – Ärger über das Verhalten <b>anderer</b> (nicht für sich selbst).</p>
<p class="ex">I wish my neighbours <b>would</b> turn the music down.</p>
<p><b>If only …</b> funktioniert genauso, ist aber stärker. <b>I'd rather you + Past Simple</b> = ich hätte lieber, dass du …</p>`,
    items: [
      { t: 'gap', q: 'I wish I ___ (speak) French – it would be useful in my job.', a: ['spoke', 'could speak'], ex: 'Gegenwart → wish + Past Simple (oder could).' },
      { t: 'gap', q: 'I wish I ___ (not / eat) so much yesterday.', a: ['had not eaten'], ex: 'Vergangenheit → wish + Past Perfect.' },
      { t: 'mc', q: 'I wish my neighbours ___ their music so loud at night.', o: ['wouldn\'t play', 'don\'t play', 'won\'t play'], a: 0, ex: 'Ärger über das Verhalten anderer → wish + would.' },
      { t: 'mc', q: 'If only I ___ her number! I could call her now.', o: ['had', 'have', 'would have'], a: 0, ex: 'Wunsch zur Gegenwart → Past Simple.' },
      { t: 'gap', q: 'It\'s late. I\'d rather you ___ (go) home now.', a: ['went'], ex: '„I\'d rather + Person“ + Past Simple.' },
      { t: 'err', s: 'I wish I [would be] taller.', fix: ['were', 'was'], ex: 'Kein would für sich selbst → wish + Past Simple (were).' },
      { t: 'order', de: 'Hätte ich doch nur auf meine Eltern gehört.', s: 'If only I had listened to my parents.' }
    ]
  },
  {
    id: 'passive', title: 'Passiv & have something done', level: 'B2',
    explain: `
<p><b>be + 3. Form</b> in allen Zeiten – die Zeitform steckt in „be“.</p>
<p class="ex">The bridge <b>was built</b> in 1887. · The room <b>is being cleaned</b>. · The results <b>will be published</b>.</p>
<p><b>Unpersönliches Passiv</b> (formell): <i>It is said that … / He is said to …</i></p>
<p class="ex">He <b>is said to be</b> a millionaire. · The law <b>is expected to be introduced</b> next year.</p>
<p><b>have/get something done</b> – jemand anderes macht etwas für dich.</p>
<p class="ex">I <b>had</b> my hair <b>cut</b>. · We're <b>getting</b> the car <b>repaired</b>.</p>`,
    items: [
      { t: 'gap', q: 'This bridge ___ (build) in 1887.', a: ['was built'], ex: 'Simple Past Passiv: was/were + 3. Form.' },
      { t: 'gap', q: 'The results ___ (publish) next week.', a: ['will be published', 'are going to be published'], ex: 'Zukunft im Passiv: will be + 3. Form.' },
      { t: 'gap', q: 'The room ___ (clean) at the moment – please wait outside.', a: ['is being cleaned'], ex: 'Present Continuous Passiv: is being + 3. Form.' },
      { t: 'mc', q: 'The report ___ yet.', o: ['hasn\'t been finished', 'hasn\'t finished', 'isn\'t finishing'], a: 0, ex: 'Present Perfect Passiv: has been + 3. Form.' },
      { t: 'mc', q: 'I ___ my hair cut yesterday.', o: ['had', 'was', 'did'], a: 0, ex: 'have something done → I had my hair cut.' },
      { t: 'gap', q: 'The new law is expected ___ (introduce) next year.', a: ['to be introduced'], ex: 'Passiv-Infinitiv: to be + 3. Form.' },
      { t: 'trans', q: 'Setze ins Passiv.', s: 'Someone stole my bike last night.', hint: 'My bike …', a: ['My bike was stolen last night.'], ex: 'Der Täter ist unbekannt → Passiv ohne by.' },
      { t: 'trans', q: 'Formuliere mit „He is said …“ um.', s: 'People say that he is a millionaire.', hint: 'He is said …', a: ['He is said to be a millionaire.'], ex: 'Unpersönliches Passiv: Subjekt + is said + to-Infinitiv.' },
      { t: 'err', s: 'The letter [was send] yesterday.', fix: ['was sent'], ex: 'Passiv braucht die 3. Form: send – sent – sent.' },
      { t: 'order', de: 'Die Entscheidung ist noch nicht getroffen worden.', s: 'The decision has not been made yet.' }
    ]
  },
  {
    id: 'reported', title: 'Indirekte Rede (Reported Speech)', level: 'B2',
    explain: `
<p><b>Zeitverschiebung (Backshift)</b> nach einem Einleitungsverb in der Vergangenheit:</p>
<table class="gt"><tr><th>direkt</th><th>indirekt</th></tr>
<tr><td>am / is</td><td>was</td></tr><tr><td>Present Perfect / Past</td><td>Past Perfect</td></tr>
<tr><td>will / can</td><td>would / could</td></tr><tr><td>tomorrow / here</td><td>the next day / there</td></tr></table>
<p><b>Fragen</b>: Wortstellung wie im Aussagesatz, Ja/Nein-Fragen mit <i>if/whether</i>.</p>
<p class="ex">“Where do you live?” → She asked me where <b>I lived</b>.</p>
<p><b>Aufforderungen</b>: tell/ask sb (not) to do.</p>
<p class="ex">“Don't touch it!” → He told us <b>not to touch</b> it.</p>
<div class="tip"><b>say</b> something – <b>tell</b> somebody something.</div>`,
    items: [
      { t: 'trans', q: 'Setze in die indirekte Rede.', s: 'She said, “I am tired.”', hint: 'She said …', a: ['She said she was tired.', 'She said that she was tired.'], ex: 'am → was (Backshift).' },
      { t: 'gap', q: 'He said: “I will call you tomorrow.” → He told me he ___ me the next day.', a: ['would call'], ex: 'will → would, tomorrow → the next day.' },
      { t: 'mc', q: 'She asked me, “Where do you live?” → She asked me where ___.', o: ['I lived', 'did I live', 'do I live'], a: 0, ex: 'Indirekte Frage: keine Inversion, kein do/did.' },
      { t: 'mc', q: '“Are you coming?” → He asked ___ I was coming.', o: ['if', 'that', 'what'], a: 0, ex: 'Ja/Nein-Frage → if/whether.' },
      { t: 'gap', q: '“Don\'t touch the screen!” → The teacher told us ___ (not / touch) the screen.', a: ['not to touch'], ex: 'Verneinte Aufforderung → tell sb not to do.' },
      { t: 'gap', q: '“I have finished the report.” → She said she ___ the report.', a: ['had finished'], ex: 'Present Perfect → Past Perfect.' },
      { t: 'mc', q: 'He ___ me that he was leaving the company.', o: ['told', 'said', 'spoke'], a: 0, ex: 'tell + Person; say ohne Person (oder say to sb).' },
      { t: 'err', s: 'He asked me where [did I work].', fix: ['I worked'], ex: 'Indirekte Fragen haben die Wortstellung eines Aussagesatzes.' },
      { t: 'order', de: 'Sie fragte mich, ob ich den Film gesehen hätte.', s: 'She asked me whether I had seen the film.' }
    ]
  },
  {
    id: 'relative', title: 'Relativsätze', level: 'B2',
    explain: `
<p><b>who</b> (Personen) · <b>which</b> (Dinge) · <b>that</b> (beides, nur notwendige Relativsätze) · <b>whose</b> (dessen/deren) · <b>where</b> (Ort) · <b>when</b> (Zeit)</p>
<p><b>Notwendige Relativsätze</b> (defining): ohne Kommas; ist das Pronomen Objekt, kann es entfallen.</p>
<p class="ex">The book (<b>that</b>) I bought is great.</p>
<p><b>Nicht notwendige Relativsätze</b> (non-defining): mit Kommas, <b>nie that</b>, Pronomen nie weglassen.</p>
<p class="ex">Hamburg, <b>which</b> has a big port, is in the north.</p>
<div class="tip"><b>which</b> kann sich auf einen ganzen Satz beziehen: He passed, <b>which</b> surprised everyone.<br>Präposition meist am Ende: the person (who) I spoke <b>to</b>.</div>`,
    items: [
      { t: 'mc', q: 'The woman ___ car was stolen called the police.', o: ['whose', 'who', 'which'], a: 0, ex: 'Besitz („deren Auto“) → whose.' },
      { t: 'mc', q: 'My brother, ___ lives in Munich, is a doctor.', o: ['who', 'that', 'which'], a: 0, ex: 'Non-defining (Kommas) + Person → who, nicht that.' },
      { t: 'gap', q: 'This is the café ___ we first met.', a: ['where', 'in which'], ex: 'Ort → where.' },
      { t: 'mc', q: 'He passed all his exams, ___ surprised everyone.', o: ['which', 'that', 'what'], a: 0, ex: 'Bezug auf den ganzen Satz → which.' },
      { t: 'err', s: 'Hamburg, [that] is Germany\'s second-largest city, has a big port.', fix: ['which'], ex: 'Non-defining Relativsatz → kein that.' },
      { t: 'mc', q: 'In welchem Satz kann das Relativpronomen wegfallen?', o: ['The book that I bought is great.', 'The man who called you is here.', 'Berlin, which I love, is busy.'], a: 0, ex: '„that“ ist hier Objekt eines notwendigen Relativsatzes → kann entfallen.' },
      { t: 'gap', q: 'That was the year ___ everything changed.', a: ['when', 'in which', 'that'], ex: 'Zeit → when.' },
      { t: 'trans', q: 'Verbinde zu einem Satz.', s: 'I met a man. His sister is a famous singer.', hint: 'I met a man …', a: ['I met a man whose sister is a famous singer.'], ex: '„His sister“ → whose sister.' },
      { t: 'order', de: 'Die Person, mit der ich gesprochen habe, war sehr hilfsbereit.', s: 'The person I spoke to was very helpful.' }
    ]
  },
  {
    id: 'modals', title: 'Modalverben: Vermutung & Kritik', level: 'C1',
    explain: `
<table class="gt"><tr><th></th><th>Gegenwart</th><th>Vergangenheit</th></tr>
<tr><td>sicher ja</td><td>must</td><td>must have + 3. Form</td></tr>
<tr><td>möglich</td><td>might / may / could</td><td>might / may / could have + 3. Form</td></tr>
<tr><td>sicher nein</td><td>can't</td><td>can't / couldn't have + 3. Form</td></tr></table>
<p class="ex">He <b>must be</b> tired. · She <b>can't have seen</b> me. · I <b>might have left</b> it at home.</p>
<p><b>should have + 3. Form</b> – Kritik/Bedauern: You <b>should have told</b> me.</p>
<div class="tip"><b>needn't have done</b> = man hat es getan, war aber unnötig.<br><b>didn't need to do</b> = es war nicht nötig (meist nicht getan).<br>Für „sicher nein“ nie <s>mustn't</s> – das bedeutet „darf nicht“.</div>`,
    items: [
      { t: 'mc', q: 'He\'s been working for 14 hours. He ___ be exhausted.', o: ['must', 'can\'t', 'should'], a: 0, ex: 'Logische Schlussfolgerung (sicher ja) → must.' },
      { t: 'mc', q: 'That ___ be Anna at the door – she\'s in Japan this week.', o: ['can\'t', 'mustn\'t', 'must'], a: 0, ex: 'Sicher nein → can\'t (nicht mustn\'t).' },
      { t: 'gap', q: 'The streets are wet. It ___ (rain) last night.', a: ['must have rained'], ex: 'Sichere Vermutung über die Vergangenheit → must have + 3. Form.' },
      { t: 'gap', q: 'I can\'t find my wallet. I ___ (leave) it in the restaurant – I\'m not sure.', a: ['might have left', 'may have left', 'could have left'], ex: 'Möglichkeit in der Vergangenheit → might/may/could have.' },
      { t: 'mc', q: 'She ___ seen me – she walked right past without saying hello.', o: ['can\'t have', 'mustn\'t have', 'shouldn\'t have'], a: 0, ex: 'Sicher nein (Vergangenheit) → can\'t have.' },
      { t: 'gap', q: 'You ___ (tell) me earlier! Now it\'s too late.', a: ['should have told', 'ought to have told'], ex: 'Kritik an Vergangenem → should have + 3. Form.' },
      { t: 'mc', q: 'I ___ bought milk – there was already some in the fridge. (Ich habe sie gekauft, umsonst.)', o: ['needn\'t have', 'didn\'t need to', 'mustn\'t have'], a: 0, ex: 'Getan, aber unnötig → needn\'t have + 3. Form.' },
      { t: 'err', s: 'He [mustn\'t have] seen the sign, otherwise he would have stopped.', fix: ['can\'t have', 'couldn\'t have'], ex: 'Sicher nein in der Vergangenheit → can\'t/couldn\'t have.' },
      { t: 'order', de: 'Du musst nach dem Flug sehr müde gewesen sein.', s: 'You must have been very tired after the flight.' }
    ]
  },
  {
    id: 'gerund-inf', title: 'Gerund oder Infinitiv', level: 'B2',
    explain: `
<p><b>+ -ing</b>: enjoy, avoid, mind, suggest, consider, finish, keep, can't stand, look forward to, be used to – und <b>nach jeder Präposition</b>.</p>
<p class="ex">I'm looking forward to <b>hearing</b> from you. · She suggested <b>taking</b> the train.</p>
<p><b>+ to</b>: want, decide, hope, plan, afford, manage, refuse, agree, would like.</p>
<p class="ex">He managed <b>to finish</b> on time.</p>
<div class="tip"><b>Bedeutungsunterschied</b><br>
stop doing (aufhören) – stop to do (anhalten, um zu)<br>
remember doing (sich erinnern) – remember to do (daran denken)<br>
try doing (ausprobieren) – try to do (versuchen)</div>`,
    items: [
      { t: 'gap', q: 'I\'m looking forward to ___ (hear) from you.', a: ['hearing'], ex: '„to“ ist hier Präposition → -ing.' },
      { t: 'gap', q: 'We can\'t afford ___ (buy) a new car.', a: ['to buy'], ex: 'afford + to-Infinitiv.' },
      { t: 'mc', q: 'Would you mind ___ the window?', o: ['opening', 'to open', 'open'], a: 0, ex: 'mind + -ing.' },
      { t: 'mc', q: 'I stopped ___ a coffee on my way to work. (= um einen Kaffee zu kaufen)', o: ['to buy', 'buying', 'buy'], a: 0, ex: 'stop to do = anhalten, um etwas zu tun.' },
      { t: 'mc', q: 'I remember ___ him at a conference years ago.', o: ['meeting', 'to meet', 'meet'], a: 0, ex: 'remember doing = sich an etwas Vergangenes erinnern.' },
      { t: 'gap', q: 'She suggested ___ (take) the train instead.', a: ['taking'], ex: 'suggest + -ing.' },
      { t: 'gap', q: 'He managed ___ (finish) the project on time.', a: ['to finish'], ex: 'manage + to-Infinitiv.' },
      { t: 'err', s: 'I\'m thinking about [to change] my job.', fix: ['changing'], ex: 'Nach Präpositionen (about) → -ing.' },
      { t: 'trans', q: 'Formuliere mit „Don\'t forget …“.', s: 'Remember: lock the door!', hint: 'Don\'t forget …', a: ['Don\'t forget to lock the door.', 'Don\'t forget to lock the door!'], ex: 'forget/remember to do = an eine zukünftige Aufgabe denken.' },
      { t: 'order', de: 'Ich bin es nicht gewohnt, so früh aufzustehen.', s: 'I\'m not used to getting up so early.' }
    ]
  },
  {
    id: 'used-to', title: 'used to, be used to, get used to', level: 'B2',
    explain: `
<p><b>used to + Infinitiv</b> – früher (heute nicht mehr).</p>
<p class="ex">I <b>used to smoke</b>. · <b>Did</b> you <b>use to</b> play the piano?</p>
<p><b>be used to + -ing</b> – an etwas gewöhnt sein. <b>get used to + -ing</b> – sich an etwas gewöhnen.</p>
<p class="ex">I'm used to <b>cycling</b> in the rain. · She's getting used to <b>working</b> from home.</p>
<p><b>would</b> – wiederholte Handlungen in der Vergangenheit, aber <b>nicht</b> für Zustände (live, have, be …).</p>`,
    items: [
      { t: 'gap', q: 'I ___ (smoke), but I gave up five years ago.', a: ['used to smoke'], ex: 'Früher, heute nicht mehr → used to + Infinitiv.' },
      { t: 'mc', q: 'I\'ve lived in Hamburg for years, so I\'m used to ___ in the rain.', o: ['cycling', 'cycle', 'cycled'], a: 0, ex: 'be used to + -ing.' },
      { t: 'mc', q: 'It took me months to get used to ___ on the left.', o: ['driving', 'drive', 'drove'], a: 0, ex: 'get used to + -ing.' },
      { t: 'mc', q: 'When I was a child, we ___ go to the Baltic Sea every summer.', o: ['would', 'were used to', 'are used to'], a: 0, ex: 'Wiederholte Handlung in der Vergangenheit → would (oder used to).' },
      { t: 'mc', q: '___ play an instrument as a child?', o: ['Did you use to', 'Did you used to', 'Were you used to'], a: 0, ex: 'In Fragen und Verneinungen: did … use to (ohne d).' },
      { t: 'err', s: 'I [am used to get up] early – it\'s no problem for me.', fix: ['am used to getting up'], ex: 'be used to + -ing.' },
      { t: 'err', s: 'We [would live] in a small flat when I was a student.', fix: ['used to live', 'lived'], ex: '„live“ ist ein Zustand → used to, nicht would.' },
      { t: 'order', de: 'Sie gewöhnt sich langsam daran, von zu Hause zu arbeiten.', s: 'She is slowly getting used to working from home.' }
    ]
  },
  {
    id: 'inversion', title: 'Inversion', level: 'C1',
    explain: `
<p>Nach <b>verneinenden oder einschränkenden Ausdrücken am Satzanfang</b> folgt die Wortstellung einer Frage (Hilfsverb vor Subjekt). Wirkt formell und nachdrücklich.</p>
<p class="ex"><b>Never have I</b> seen such a mess. · <b>Little did we know</b> … · <b>Not only does she</b> speak French, but …</p>
<p>Weitere Auslöser: <i>Rarely, Seldom, Hardly … when, No sooner … than, Under no circumstances, Only then, Not until</i></p>
<p><b>Inversion statt if</b> (formell): <b>Had I</b> known … · <b>Should you</b> need help … · <b>Were I</b> in your position …</p>`,
    items: [
      { t: 'mc', q: 'Never ___ such a beautiful sunset.', o: ['have I seen', 'I have seen', 'I saw'], a: 0, ex: '„Never“ am Satzanfang → Inversion.' },
      { t: 'mc', q: 'No sooner had we sat down ___ the phone rang.', o: ['than', 'when', 'then'], a: 0, ex: 'No sooner … than.' },
      { t: 'mc', q: 'Hardly had the meeting started ___ the fire alarm went off.', o: ['when', 'than', 'that'], a: 0, ex: 'Hardly … when.' },
      { t: 'gap', q: '___ (have) I known about the problem, I would have helped.', a: ['had'], ex: 'Had I known = If I had known.' },
      { t: 'mc', q: 'Little ___ that the company was about to go bankrupt.', o: ['did we know', 'we knew', 'we did know'], a: 0, ex: '„Little“ am Satzanfang → did + Subjekt + Infinitiv.' },
      { t: 'trans', q: 'Beginne mit „Should …“.', s: 'If you need any help, please contact us.', hint: 'Should …', a: ['Should you need any help, please contact us.', 'Should you need any help please contact us.'], ex: 'Should you … = If you …' },
      { t: 'trans', q: 'Beginne mit „Never …“.', s: 'I had never been so embarrassed.', hint: 'Never …', a: ['Never had I been so embarrassed.'], ex: 'Never + had + Subjekt + 3. Form.' },
      { t: 'err', s: 'Not only [she speaks] French, but she also speaks Russian.', fix: ['does she speak'], ex: '„Not only“ am Satzanfang → Inversion mit does.' },
      { t: 'order', de: 'Unter keinen Umständen solltest du diese Tür öffnen.', s: 'Under no circumstances should you open this door.' }
    ]
  },
  {
    id: 'articles', title: 'Artikel – typische Fehler', level: 'B1',
    explain: `
<p><b>Kein Artikel</b> bei allgemeinen Aussagen mit unzählbaren Nomen oder im Plural:</p>
<p class="ex"><b>Life</b> is short. · <b>Money</b> doesn't make you happy. · I like <b>dogs</b>.</p>
<p><b>a/an bei Berufen</b> – anders als im Deutschen: She is <b>an</b> engineer.</p>
<p><b>Kein Artikel</b> bei Mahlzeiten (have breakfast), go to work/bed/school, by bike/train, den meisten Ländern.<br>
<b>Mit the</b>: the UK, the USA, the Netherlands; Musikinstrumente (play the guitar); eindeutig Bestimmtes (pass me the salt).</p>`,
    items: [
      { t: 'mc', q: 'She is ___ engineer.', o: ['an', 'a', '–'], a: 0, ex: 'Beruf → a/an; vor Vokal-Laut „an“.' },
      { t: 'mc', q: '___ life is too short for bad coffee.', o: ['–', 'The', 'A'], a: 0, ex: 'Allgemeine Aussage, unzählbar → kein Artikel.' },
      { t: 'mc', q: 'I usually have ___ breakfast at 7.', o: ['–', 'the', 'a'], a: 0, ex: 'Mahlzeiten ohne Artikel.' },
      { t: 'mc', q: 'We spent our holiday in ___ Netherlands.', o: ['the', '–', 'a'], a: 0, ex: 'Plural-Ländernamen → the Netherlands.' },
      { t: 'gap', q: 'He plays ___ guitar in a band.', a: ['the'], ex: 'Musikinstrumente → the.' },
      { t: 'mc', q: 'Can you pass me ___ salt, please?', o: ['the', '–', 'a'], a: 0, ex: 'Das bestimmte Salz auf dem Tisch → the.' },
      { t: 'err', s: 'My father is [teacher].', fix: ['a teacher'], ex: 'Berufe brauchen a/an.' },
      { t: 'err', s: '[The money] doesn\'t make you happy.', fix: ['money'], ex: 'Allgemeine Aussage → kein Artikel.' },
      { t: 'order', de: 'Ich fahre mit dem Fahrrad zur Arbeit.', s: 'I go to work by bike.' }
    ]
  },
  {
    id: 'false-friends', title: 'False Friends Deutsch–Englisch', level: 'B1',
    explain: `
<p>Wörter, die gleich aussehen, aber etwas anderes bedeuten:</p>
<table class="gt"><tr><th>Deutsch</th><th>Englisch</th><th>Vorsicht</th></tr>
<tr><td>bekommen</td><td>get, receive</td><td>become = werden</td></tr>
<tr><td>eventuell</td><td>possibly</td><td>eventually = schließlich</td></tr>
<tr><td>aktuell</td><td>current</td><td>actual = tatsächlich</td></tr>
<tr><td>sensibel</td><td>sensitive</td><td>sensible = vernünftig</td></tr>
<tr><td>Chef</td><td>boss</td><td>chef = Koch</td></tr>
<tr><td>Handy</td><td>mobile (phone)</td><td>handy = praktisch</td></tr>
<tr><td>Gift</td><td>poison</td><td>gift = Geschenk</td></tr>
<tr><td>also</td><td>so, therefore</td><td>also = auch</td></tr>
<tr><td>konsequent</td><td>consistent</td><td>consequent = (darauf)folgend</td></tr>
<tr><td>Rente</td><td>pension</td><td>rent = Miete</td></tr>
<tr><td>ich will</td><td>I want</td><td>I will = ich werde</td></tr></table>`,
    items: [
      { t: 'mc', q: '„Ich bekomme morgen ein Paket.“', o: ['I\'m getting a parcel tomorrow.', 'I\'m becoming a parcel tomorrow.', 'I become a parcel tomorrow.'], a: 0, ex: 'bekommen = get/receive; become = werden.' },
      { t: 'mc', q: '„eventuell“ heißt auf Englisch …', o: ['possibly / perhaps', 'eventually', 'evenly'], a: 0, ex: 'eventually = schließlich, am Ende.' },
      { t: 'mc', q: '„die aktuelle Lage“', o: ['the current situation', 'the actual situation', 'the actually situation'], a: 0, ex: 'actual = tatsächlich, wirklich.' },
      { t: 'mc', q: '„Er ist sehr sensibel.“', o: ['He is very sensitive.', 'He is very sensible.', 'He is very sensual.'], a: 0, ex: 'sensible = vernünftig.' },
      { t: 'mc', q: '„Mein Chef ist im Urlaub.“', o: ['My boss is on holiday.', 'My chef is on holiday.', 'My chief is in holiday.'], a: 0, ex: 'chef = Koch/Köchin.' },
      { t: 'mc', q: '„Das ist Gift!“', o: ['That\'s poison!', 'That\'s a gift!', 'That\'s toxic gift!'], a: 0, ex: 'gift = Geschenk.' },
      { t: 'mc', q: '„Er hat konsequent gearbeitet.“', o: ['He worked consistently.', 'He worked consequently.', 'He worked consequent.'], a: 0, ex: 'consequently = folglich.' },
      { t: 'mc', q: '„Sie geht nächstes Jahr in Rente.“', o: ['She is retiring next year.', 'She is going into rent next year.', 'She goes in rent next year.'], a: 0, ex: 'in Rente gehen = retire; Rente = pension; rent = Miete.' },
      { t: 'gap', q: '„Ich will einen Kaffee.“ → I ___ a coffee.', a: ['want', 'would like'], ex: 'I will = ich werde.' },
      { t: 'mc', q: '„Ich bin seit Montag hier.“', o: ['I have been here since Monday.', 'I am here since Monday.', 'I am here for Monday.'], a: 0, ex: '„seit“ mit Bezug bis jetzt → Present Perfect.' }
    ]
  }
];

/* Startpaket – nützliche Wörter B2/C1. ex enthält das Wort, damit Lückentexte funktionieren. */
const STARTER = [
  ['reluctant', 'widerwillig, zögerlich', 'adjective', 'She was reluctant to accept the offer.'],
  ['postpone', 'verschieben', 'verb', 'The meeting has been postponed until next week.'],
  ['thorough', 'gründlich', 'adjective', 'The doctor did a thorough examination.'],
  ['tackle', '(ein Problem) angehen', 'verb', 'We need to tackle this problem immediately.'],
  ['reliable', 'zuverlässig', 'adjective', 'Is the train service reliable?'],
  ['acknowledge', 'anerkennen, zugeben', 'verb', 'He acknowledged that he had made a mistake.'],
  ['sustainable', 'nachhaltig', 'adjective', 'The company is looking for more sustainable materials.'],
  ['undermine', 'untergraben', 'verb', 'Constant criticism can undermine your confidence.'],
  ['approach', 'Ansatz, Herangehensweise', 'noun', 'We need a new approach to this problem.'],
  ['cope with', 'zurechtkommen mit, bewältigen', 'verb', 'How do you cope with stress?'],
  ['outcome', 'Ergebnis, Ausgang', 'noun', 'Nobody could predict the outcome of the election.'],
  ['emphasise', 'betonen', 'verb', 'She emphasised the importance of teamwork.'],
  ['awkward', 'unangenehm, peinlich', 'adjective', 'There was an awkward silence.'],
  ['deteriorate', 'sich verschlechtern', 'verb', 'The weather deteriorated quickly.'],
  ['feasible', 'machbar, durchführbar', 'adjective', 'Is it feasible to finish the project by Friday?'],
  ['anticipate', 'erwarten, vorhersehen', 'verb', 'We don\'t anticipate any problems.'],
  ['ambiguous', 'mehrdeutig, unklar', 'adjective', 'The wording of the contract is ambiguous.'],
  ['comply with', 'einhalten, befolgen', 'verb', 'All companies must comply with the new rules.'],
  ['shortage', 'Mangel, Knappheit', 'noun', 'There is a shortage of skilled workers.'],
  ['put off', 'aufschieben', 'verb', 'Stop putting off your tax return!'],
  ['rely on', 'sich verlassen auf', 'verb', 'You can always rely on her.'],
  ['consistent', 'beständig, einheitlich', 'adjective', 'His results have been very consistent.'],
  ['estimate', 'schätzen', 'verb', 'The costs are estimated at two million euros.'],
  ['inevitable', 'unvermeidlich', 'adjective', 'Some delays are inevitable.'],
  ['carry out', 'durchführen', 'verb', 'The survey was carried out last year.'],
  ['point out', 'hinweisen auf', 'verb', 'She pointed out a mistake in my calculation.'],
  ['drawback', 'Nachteil', 'noun', 'The main drawback is the price.'],
  ['take into account', 'berücksichtigen', 'verb', 'You have to take into account that prices are rising.'],
  ['struggle', 'sich abmühen, kämpfen', 'verb', 'Many students struggle to find a flat in big cities.'],
  ['overcome', 'überwinden', 'verb', 'It took him years to overcome his fear of flying.'],
  ['accurate', 'genau, zutreffend', 'adjective', 'The forecast was surprisingly accurate.'],
  ['assume', 'annehmen, vermuten', 'verb', 'I assume you\'ve already heard the news.'],
  ['enhance', 'verbessern, steigern', 'verb', 'The new design enhances the user experience.'],
  ['obvious', 'offensichtlich', 'adjective', 'The answer seems obvious now.'],
  ['hesitate', 'zögern', 'verb', 'Don\'t hesitate to contact me.'],
  ['considerable', 'beträchtlich', 'adjective', 'The project took a considerable amount of time.'],
  ['figure out', 'herausfinden, verstehen', 'verb', 'I can\'t figure out how this works.'],
  ['commute', 'pendeln', 'verb', 'I commute to work by train.'],
  ['deadline', 'Frist, Abgabetermin', 'noun', 'The deadline for applications is Friday.'],
  ['in charge of', 'verantwortlich für', 'phrase', 'Who is in charge of the project?'],
  ['eventually', 'schließlich, letztendlich', 'adverb', 'Eventually, we found the right solution.'],
  ['appreciate', 'zu schätzen wissen', 'verb', 'I really appreciate your help.'],
  ['accomplish', 'erreichen, schaffen', 'verb', 'We accomplished a lot this week.'],
  ['straightforward', 'unkompliziert, einfach', 'adjective', 'The instructions are quite straightforward.'],
  ['look forward to', 'sich freuen auf', 'verb', 'I\'m looking forward to the weekend.'],
  ['keep up with', 'Schritt halten mit', 'verb', 'It\'s hard to keep up with all the changes.'],
  ['on the other hand', 'andererseits', 'phrase', 'On the other hand, the flat is very central.'],
  ['run out of', '(etw.) ausgehen, aufbrauchen', 'verb', 'We are running out of milk.'],
  ['nevertheless', 'dennoch, trotzdem', 'adverb', 'It was raining; nevertheless, we went for a walk.'],
  ['get rid of', 'loswerden', 'verb', 'I need to get rid of some old clothes.'],
  ['trade-off', 'Zielkonflikt, Abwägung', 'noun', 'There is always a trade-off between speed and quality.'],
  ['bear in mind', 'bedenken, berücksichtigen', 'verb', 'Bear in mind that the shops close early on Saturdays.'],
  ['be supposed to', 'sollen (Erwartung, Regel)', 'verb', 'You are supposed to be at work by nine.'],
  ['make up your mind', 'sich entscheiden', 'verb', 'You need to make up your mind soon.']
];
