
# Businesshotel-Roommanager
Ein Java-Projekt zum Management von Zimmern in einem Businesshotel.<br> 
[![Build Status](https://github.com/fh-erfurt/Businesshotel-Roommanager/workflows/JavaCIwithMaven/badge.svg)](https://github.com/fh-erfurt/Businesshotel-Roommanager/actions)
![CodeFactor](https://img.shields.io/badge/JAVA-14-blue)
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
### Installation

___

```
Vorrausetzungen: AngularCLI sollte installiert sein, am besten global.

```

	1. Erstellen Sie die Datenbank mithilfe des SQL-Befehls 
-> [Datenbank erstellen](database/DatabaseCreate.sql) 

***Datenbankname: bh_room_db  (ohne Passwort)***

	2. Füllen Sie die Datenbank mit Testdaten mithilfe der SQL-Befehle
-> [Testdatensatz erstellen](database/Testdatensatz.sql) 

	3. Führen Sie "yarn install" im client-Order aus, um die Dependencies aus Angular einzubinden
	-> src/main/java/de/fourofakind/businesshotel/client
-> [yarn install im Client-Ordner ausführen](src/main/java/de/fourofakind/businesshotel/client) 

### Starten der Anwendung

___

	1. Starten Sie die RoommanagerApplication in Ihrer IDE
-> [RoommanagerApplication starten](src/main/java/de/fourofakind/businesshotel/server/RoommanagerApplication.java) 
	
	2. Starten Sie den Bereitstellungsserver 
-> [AngularServer starten](src/main/java/de/fourofakind/businesshotel/client)
	-> im Ordner wie angegeben mit dem Befehl: "ng serve"

Die Applikation steht Ihnen nun zur Nutzung bereit. Öffnen Sie einen Browser und begeben Sie sich auf die Seite:
	-> http://localhost:4200/


### Zugang Selenium Testsuite - Businesshotel Roommanager
	
-> [Selenium-Testprojekt herunterladen](https://github.com/Thom-Mon/Selenium_Test_BH_Room.git)
	
	1. Folgen Sie den Anweisungen in der Selenium-BH-Testroom Readme
	
### Verwendung der Anwendung
## Login-Daten für verschiedene vorhandene Acounts

| Rolle | Username | Passwort  |
|---|---|---|
| Buchungsmanager | SchlaubiSchlumpf | SicheresPasswort |
| Hotelleiter | FlodinWiesret | SicheresPasswort |
| Kundenmanager | MagnolienAusStahl | SicheresPasswort |
| Raummanager | ColumboAuge | SicheresPasswort |
| Personalmanager | Marius Mac Mac | SicheresPasswort |
	
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
	- Erstellung und Implementierung eines Personalverwaltungssystem

## Abgrenzungskriterien
Nicht zum Projektumfang gehören:

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

![alt text](UseCaseDiagramme_Booking.png "UseCaseDiagramme Booking")

</details>
<details>
<summary>UseCaseDiagramme Customer</summary>

![alt text](UseCaseDiagramme_Customer.png "UseCaseDiagramme Customer")

</details>
<details>
<summary>UseCaseDiagramme Room</summary>

![alt text](UseCaseDiagramme_Room.png "UseCaseDiagramme Room")

</details>	

</details>



<details>
<summary> Meetingprotokolle </summary>
<br>

* [Java 1](Meeting_Protocols/Meetings.md) 
* [Java 2](Meeting_Protocols/Meetings2.md)

</details>






<details>
<summary> Verwendete Software </summary>
<br>

* [IntelliJ](https://www.jetbrains.com/de-de/idea/) - IDE für JAVA (Server)
* [Webstorm](https://www.jetbrains.com/de-de/webstorm/) - IDE für Angular (Client)
* [VSCode](https://code.visualstudio.com/) - IDE für Angular (Client)	
* [draw.io](https://app.diagrams.net/) - Tool für die Erstellung der Diagramme
* [lucidchart](https://app.lucidchart.com/) - Tool für die Erstellung der Diagramme
* [Office](https://www.office.com/) - Office Programm
* [Git](https://git-scm.com/) - Versionskontrolle
* [Webex](https://www.webex.com/de/video-conferencing.html) - Kommunikationsmittel für regelmäßige Meetings
* [Telegram](https://telegram.org/) - Kommunikationsmittel zum schnellen Austausch
* [MySQLWorkbench](https://www.mysql.com/de/products/workbench/) - Entwurf der Datenbank und Generierung des SQL Skripts

</details>


