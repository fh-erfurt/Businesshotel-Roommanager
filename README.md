
# Businesshotel-Roommanager
Ein Java-Projekt zum Management von Zimmern in einem Businesshotel.<br> 
[![Build Status](https://github.com/fh-erfurt/Businesshotel-Roommanager/workflows/JavaCIwithMaven/badge.svg)](https://github.com/fh-erfurt/Businesshotel-Roommanager/actions)
![CodeFactor](https://img.shields.io/badge/JAVA-15-blue)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/fh-erfurt/Businesshotel-Roommanager/blob/master/LICENSE)

### Dokumentation

___

#### Projektbeschreibung
```

Es soll ein Management-System für die Zimmer eines Businesshotels entwickelt werden. Der Mitarbeiter 
kann im Programm ein Zimmer buchen, dabei wird zwischen Konferenzräumen und Übernachtungszimmern 
unterschieden.
Das System unterstützt bei der Auswahl und schlägt automatisch Zimmer nach gesuchten Kriterien vor.

Ein Hotelzimmer kann für ein Datum belegt oder frei sein. Ein Konferenzraum kann für ein Datum mehrfach 
belegt werden, hier muss der Mitarbeiter nur die Belegung zur jeweiligen Uhrzeit beachten.
Eine Buchung ist in geschäftlich oder privat eingeteilt und enthält Informationen zur Start- und End-Zeit 
sowie Kontaktdaten des Buchenden.
Die Zimmer können verschiedenen Kategorien zugeordnet werden, von Einzel- über Doppelzimmern bis hin 
zu Suiten. Die Konferenzräume unterscheiden sich in Größe und Ausstattung voneinander. Zusätzlich 
gibt es für die Hotelverwaltung die Möglichkeit, die maximale Personenzahl für die Konferenzräume 
anzupassen. So kann flexibel auf die gültigen Corona-Schutzbestimmung reagiert werden. 



```


<details>
<summary> Allgemeine Projektübersicht </summary>
<br>

## Projektteam
* Niklas Wiemuth
* Marius Lange
* Thomas Gebel

## Anforderungsbeschreibung
Grobziele sind:

	- Erstellung und Implementierung eines Raumverwaltungssystem
	- Erstellung und Implementierung eines Buchungsverwaltungssystem
	- Erstellung und Implementierung eines Kundenverwaltungssystem

## Abgrenzungskriterien
Nicht zum Projektumfang gehören:

	- Personalverwaltung
	- Lohnbuchhaltung/Zeiterfassung
	- Rechnung und Mahnwesen
	
</details>


<details>
<summary> Grafiken </summary>
<br>

### Projektübersicht
![alt text](Projektübersicht.png "Projektübersicht Bild")

### Klassendiagramm
![alt text](Klassendiagramm.png "Klassenübersicht Bild")

### Use Case Diagramme
<details>
<summary>UseCaseDiagramme Booking</summary>

![alt text](https://github.com/fh-erfurt/Businesshotel-Roommanager/blob/main/Pr%C3%A4sentation/UseCaseDiagramme/UseCaseDiagramme_Booking.png "UseCaseDiagramme Booking")

</details>
<details>
<summary>UseCaseDiagramme Customer</summary>

![alt text](https://github.com/fh-erfurt/Businesshotel-Roommanager/blob/main/Pr%C3%A4sentation/UseCaseDiagramme/UseCaseDiagramme_Customer.png "UseCaseDiagramme Customer")

</details>
<details>
<summary>UseCaseDiagramme Room</summary>

![alt text](https://github.com/fh-erfurt/Businesshotel-Roommanager/blob/main/Pr%C3%A4sentation/UseCaseDiagramme/UseCaseDiagramme_Room.png "UseCaseDiagramme Room")

</details>	

</details>

### Meeting Protokolle
<details>
<summary> Meeting Protokolle </summary>
<br>

Meetings Protocol

```
06.11.2020 12:00 Platform: Webex
Teilnehmer: Niklas, Marius, Thomas

Projektthema: Ideen sammeln, Hotel wurde als Vorschlag gebracht, so als Zimmerverwaltung oder ähnliches, 
ist aber in keinster Weise bindend.

Für die Kommunikation: Wiederholenden Termin ansetzen, Mittwoch/Freitag stehen zur Debatte.
Mittwoch: 10 Uhr
Freitag:  12 Uhr

Jeder alles Einrichten um auf ein und demselben Ordner arbeiten zu können. Chocolatey etc. in seinem Video.


-Themen für nä. Treffen: 
	Gruppenvorstellung + Thema muss stehen!!!!!
	Vorbereiten der Präsentation mit Bildschirmpräsentation -> zum Thema, Teams
	Repository anlegen:  	
	Doku anlegen
```
```
11.11.2020 10:00 Platform: Webex
Teilnehmer: Niklas, Marius, Thomas 
Krank: Martin

Ideen vorgestellt für Projekte. Daraus wird im Anschluss eine Umfrage in Telegramm erstellt, 
die bis Ende des Tages beantwortet sein sollte.
Themavorschläge:
Thomas:
  Zimmerverwaltung
  EpisodenGuide
  Geburtstagserinnerungsapp
  Geräteverwaltung (Haushalt/Auto/Wartung)
Marius:
  Konferrenzraumplanung
Niklas:
  Kühlschrankverwaltung
  Vokabeltrainer
  Kalender/Terminverwaltung (Möglichkeit, um Webex Meetings inklusive Links/Zugangsdaten einzuspeisen)

Weitere Aufgaben im Zusammenhang mit Präsentation:

1. Vorstellung der Person
  Jeder entwirft eine kurze Vorstellung von sich, gerne auch mit Bild.
  Inhalte: 
    Name
    Alter
    Erfahrung
    Gamertag
    Systemspezifikationen 
Die Ausarbeitung zur Selbstvorstellung werden dann zusammengestellt in Folie für PowerpointPräsentation.

2. Verteilung der Aufgaben
  Niklas:
    Grafische Darstellung des geplanten Projektes
  Thomas:
    Erstellen des Repository im Github
    Einleitung der Dokumentation im Github
  Marius:
    Erstellen des Projektbeschreibungstextes
  Martin:
    Zusammenführen der Informationen zur PowerPoint-Präsentation

```

```
20.11.2020 10:00 Platform: Webex
Teilnehmer: Niklas, Marius, Martin, Thomas

1. Projektbeschreibung Substantive, Verben und Eigenschaften für Klassen/Methoden 
gemeinsam herausgearbeit. In UML ersten Grobentwurf erstellt und dem Projektordner
hinzugefügt. Allgemeine Geschäftslogik besprochen und diskutiert. Weiteren Ablauf
im Projekt besprochen. Notwendigkeit der Klassenentwürfe.

2. Verteilung der folgenden Aufgaben:

    Niklas:
        Klassenerstellung "Mitarbeiter"
    Martin:
        Klassenerstellung "Zimmer"
    Marius:
        Klassenerstellung "Kunden"
    Thomas:
        Ordnerstruktur anlegen für Projekt (Main/Test/Java etc.)
        Meetingprotokoll aufsetzen
        Klassenerstellung "Buchung"
```

```
25.11.2020 10:00 Platform: Webex
Teilnehmer: Niklas, Marius, Thomas
Nicht anwesend: Martin


1. Auswertung des letzten Meetings und der dort gestellten Aufgaben. Fehlende Zuarbeit
   eines Mitglieds besprochen, und das damit verbundene weitere Vorgehen.

2. Verfeinerung der Klassen besprochen, erstellen von Konstruktoren und Value-Klassen
    als komplexe Datentypen. Teilweise Live Änderung am Code besprochen und durchgeführt.

3. Jeder soll sich Gedanken machen über die Geschäftslogik und die Implementierung im Code
   Etwaige Auslagerung in Unterklasssen bzw. Value-Klassen prüfen.

4. Sicherstellung über den gemeinsam Wissenstand beim Anwenden der Versionskontrolle und IDE 
   bei der Projekterstellung und -bearbeitung.

```

```
02.12.2020 10:45 Uhr Platform: Webex
Teilnehmer: Martin, Niklas, Marius, Thomas

1. Projektfortschritt besprochen, Verfeinerung der Klassen besprochen. Gespräch über 
notwendige Mitteilung bei Ausfällen oder Unpässlichkeiten. 
Terminänderung auf 11:00 Uhr mittwochs festgelegt.

2. Verteilung der folgenden Aufgaben:
    Martin:
        Einrichten der IDE, Installations sämtlicher Tools, mit Hilfe der Tutorialvideos 
        Anschluss an Github herstellen, Projektstatus importieren/updaten (git clone)
    Marius:
        Customer/ sendBookingRequest -> hier muss das Start und Enddate durch 
        Dateframe ersetzt werden.
    Thomas:
        Logger Testweise implementieren / Testmethode für Booking erstellen
        Konstruktoren der Booking Klasse überladen mit Hotelroom, ConferenceRoom und beidem.
        Erstellen der Issues zu den Protokollpunkten

```

```
09.12.2020 11:00 Uhr Platform: Webex
Teilnehmer: Martin, Niklas, Thomas
entschuldigt: Marius

1. Präsentation am 14.12.2020 besprochen und vorgeplant, entsprechende Aufgaben verteilt.
   Nächste Besprechung für Sonntag 20 Uhr angesetzt um Präsentation vorzubereiten.

    Alle sammeln Informationen über die Fallstricke, denen wir bisher in der Projektarbeit
    im Team und in der Arbeit am Projekt mit Java begegnet sind, diese fügen wir dann der
    Präsentation hinzu.
    Eine Powerpoint muss erstellt werden als Basis für Sonntag, wenn wir die Präsentation 
    planen.

2. Verteilung der folgenden Aufgaben:
    Martin:
        Einrichten der IDE, Installations sämtlicher Tools, mit Hilfe der Tutorialvideos 
        Anschluss an Github herstellen, Projektstatus importieren/updaten (git clone)
        Deadline gesetzt: Freitag 19 Uhr
        Codedokumentation an eigener Klasse und Value-Klassen
    Marius:
        Codedokumentation an eigener Klasse und Value-Klassen
    Thomas:
        Logger Testweise implementieren / Testmethode für Booking erstellen
        Codedokumentation an eigener Klasse und Value-Klassen
        Testfälle für Konstruktoren erstellen
    Niklas:
        Codedokumentation an eigener Klasse und Value-Klassen
```

```
13.12.2020 20:00 Uhr Platform: Webex
Teilnehmer: Martin, Niklas, Thomas, Marius

1. Absprache Ablauf Präsentation, letzte Änderungen an Inhalt und Darstellung. Festlegen
   der Reihenfolge.
```

```
##16.12.2020 20:00 Uhr Platform: Webex
Teilnehmer: Martin, Niklas, Thomas, Marius

1. Absprache der Aufgaben über die Weihnachtszeit.

   Alle:
        Testklassen für Konstruktoren und nicht triviale Methoden aus der erstellten Klasse erstellen.
        Instanzen entwerfen in der StartingClass um Gesamtfunktion testen zu können.
        etwaige fehlende Code Dokumentation nachholen
   Thomas
        Issue zum Erstellen der Testklassen und Instanzen in StartingClass anlegen
        Meeting Protokoll hochladen



```

```
06.01.2021 11:00 Uhr Platform: Webex
Teilnehmer: Martin, Niklas, Thomas, Marius

1. Absprache über offene Aufgaben 

   Alle:
        Testklassen für Konstruktoren und nicht triviale Methoden aus der erstellten Klasse erstellen->fortsetzen!
        Instanzen entwerfen in der StartingClass um Gesamtfunktion testen zu können->ergänzen!
   Thomas
        Meeting Protokoll hochladen
	Booking-Methode changeDatetime() implementieren d.h. auch Attribute hinzufügen und erstmal "null" setzen
	Booking Überarbeiten -> Buchungen aufteilen nicht beide Fällen abdecken wollen.
   Martin:
   	Klasse Room erweitern
	Testfälle erstellen -> Niklas zuarbeiten für Erstellung
   Niklas:
   	changeRoom/createRoom Methode für den Employee
	Variable zur Überprüfung der Rechte eines Employees
	
	
Fragen an Hr. Hecht:
	@BeforeEach: Wie lege ich sinnvolle Setup Methoden, die ich dann in jedem nachfolgenden Test nutzen kann?
	Wichtig für Testunterteilung bei createBooking etc.

```
```
13.01.2021 11 Uhr Telegramm
Teilnehmer: Marius, Niklas, Thomas
	
	Kurzbesprechung per Telegramm. Teamverkleinerung und Neuzuteilung der offenen Aufgaben auf die anderen Teammitglieder.

```
```
20.01.2021 11:00 Uhr Platform: Webex
Teilnehmer: Niklas, Thomas, Marius

1. Absprache über offene Aufgaben 

   Alle:
	Testfälle abschließen
	Dokumentation JAVADOC abschließen
   Thomas
        Meeting Protokoll hochladen
	Mehr Eigenschaften für Räume erstellen
	Einführen eines Zeitplans um Zeiträume zu erfassen, wann Raum belegt ist
	Github Tests zum Laufen bringen
   Marius:
	Testfälle Customer implementieren	
	
   Zur nächsten Besprechung am 25.01.2020 muss 90 % stehen, dass nur noch primär wirklich Dokuarbeit und Feinarbeit nötig ist.
   Deadline ist der 01.02.2021.
```
```
27.01.2021 11:00 Uhr Platform: Webex
Teilnehmer: Niklas, Thomas, Marius

1. Absprache über offene Aufgaben 

   Alle:
        Testfälle abschließen und Kommentieren für alle Tests
        Kommentare in Value/Common Klassen einfügen (Bsp: Fulldate)
        Dokumentation JAVADOC abschließen
        Sammeln für Präsentation "Lessons Learned"
        Sinnige Try-Catch-Blöcker ergänzen
        Code aufräumen
        Anordnung Getter/Setter und Member als Block getrennt
    
   Thomas
        Meeting Protokoll hochladen
        Preisberechnung-Methode erstellen Konferenz/Hotelzimmer
        Tests in Github Gangbar machen
        
   Niklas
        change Methods abändern zu Rückgabewert Boolean
        Use-cases zu eigenen Methoden entwerfen -> Employee
   Marius
        Use-cases zu eigenen Methoden entwerfen -> Customer
        
   Nächstes Meeting im Webex dazu am 29.01.2021 10 Uhr. Bis dahin müssen Aufgaben erfüllt sein.	
   
```
</details>

<details>
<summary> Verwendete Software </summary>
<br>

* [IntelliJ](https://www.jetbrains.com/de-de/idea/) - IDE für JAVA
* [draw.io](https://app.diagrams.net/) - Tool für die Erstellung der Diagramme
* [lucidchart](https://app.lucidchart.com/) - Tool für die Erstellung der Diagramme
* [Office](https://www.office.com/) - Office Programm
* [Git](https://git-scm.com/) - Versionskontrolle
* [Webex](https://www.webex.com/de/video-conferencing.html) - Kommunikationsmittel für regelmäßige Meetings
* [Telegram](https://telegram.org/) - Kommunikationsmittel zum schnellen Austausch

</details>


