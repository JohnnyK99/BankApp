# BankApp
[Polska wersja poniżej](#spis-treści)

## Table of contents

- [Demo](#demo)
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## Demo
Demonstrational version of the project has been deployed to Azure and is available <a href="https://bank-app-front.azurewebsites.net" target="_blank">HERE</a>

## Overview

BankApp is a project simulating an online banking service. Solution uses an MS SQL Database, .NET backend and SPA web application created with Angular.

## Features

- create user account
- open new bank account
- check balance of all currently open bank accounts
- make a transaction
  - select source account and define recipient, title, description as well as transaction amount
- manage a list of saved recipients
- download a transaction confirmation file in PDF format
- display full transaction history for selected bank account
  - includes data sorting, filtering and pagination
  
Users with *Employee* role are able to browse and display information on all client bank accounts in the system.
  
## Technologies

- Microsoft SQL Server
- .NET
  - Entity Framework
    - podejście *Code First*
  - .NET Identity
  - AutoMapper
  - MediatR
- Angular
  - RxJS
  - NgRx
  - NGX-Translate
- JSON Web Tokens

## Screenshots

![login](https://user-images.githubusercontent.com/54480682/232759753-4e180d0e-3d4a-41d8-8971-dd4d907d2ffd.png)

![dashboard](https://user-images.githubusercontent.com/54480682/232760470-99539078-8c18-4a80-b35e-54a5540092b9.png)

![det](https://user-images.githubusercontent.com/54480682/232760162-71b1d3c5-16c7-476b-b14e-08df2f5771ce.png)

![new](https://user-images.githubusercontent.com/54480682/232759774-7e84de7c-cea8-45f6-8dc9-ce3399fc735c.png)

![saved](https://user-images.githubusercontent.com/54480682/232761872-c432223d-53a0-4540-9bb4-fe6cf22fde82.png)

![list](https://user-images.githubusercontent.com/54480682/232759798-1858894d-c255-472a-bc42-8042119b2672.png)

## Spis treści

- [Wersja demonstracyjna](#wersja-demonstracyjna)
- [Opis](#opis)
- [Funkcjonalności](#funkcjonalności)
- [Technologie](#technologie)
- [Zrzuty ekranu](#zrzuty-ekranu)

## Wersja demonstracyjna

Demonstracyjna wersja aplikacji została opublikowana na platformie Azure i jest dostępna <a href="https://bank-app-front.azurewebsites.net" target="_blank">TUTAJ</a>

## Opis

BankApp jest projektem symulującym działanie systemu bankowości elektronicznej. Opiera się na bazie danych MS SQL, warstwie serwerowej stworzonej we frameworku .NET oraz aplikacji webowej typu SPA zbudowanej za pomocą Angulara.

## Funkcjonalności

- stworzenie konta użytkownika
- otwarcie nowego konta bankowego
- sprawdzenie stanu wszystkich posiadanych kont bankowych
- wykonanie transakcji
  - wybór konta wyjściowego oraz definicja odbiorcy, tytułu, opisu i kwoty przelewu
- zarządzanie listą zapisanych odbiorców
- pobranie potwierdzenia transakcji w formacie PDF
- wyświetlenie historii transakcji dla wybranego konta bankowego
  - możliwość sortowania, filtrowania oraz stronicowania danych

Dodatkowo konta z przypisaną rolą pracownika posiadają możliwość wyświetlenia informacji na temat kont wszystkich klientów.

## Technologie

- Microsoft SQL Server
- .NET
  - Entity Framework
    - podejście *Code First*
  - .NET Identity
  - AutoMapper
  - MediatR
- Angular
  - RxJS
  - NgRx
  - NGX-Translate
- JSON Web Tokens

## Zrzuty ekranu

![loginPL](https://user-images.githubusercontent.com/54480682/232760618-cc28b989-28d4-40ed-a63e-6193e7dc7463.png)

![dashboardPL](https://user-images.githubusercontent.com/54480682/232760635-dfe2ff4d-f749-4b8f-ba80-489d5f665bc2.png)

![detPL](https://user-images.githubusercontent.com/54480682/232760992-c0eaea64-27fb-4561-af95-71b510106859.png)

![newPL](https://user-images.githubusercontent.com/54480682/232760660-9345ec7b-2019-48b0-a6f8-16a55494bcaa.png)

![savedPL](https://user-images.githubusercontent.com/54480682/232761811-90ecc9d4-6a75-471e-b496-f5f13f091317.png)

![listPL](https://user-images.githubusercontent.com/54480682/232760702-7ab73acf-76fc-4330-9f4b-fd339a021572.png)
