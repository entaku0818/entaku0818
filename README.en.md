# About

*日本語版: [README.md](README.md)*

iOS lead engineer with 10+ years in software development, specializing in video streaming and ad monetization. I currently lead iOS development at TVer, one of Japan's largest free ad-supported streaming services, where I work on video playback infrastructure with The Composable Architecture and on the ad integration around it.

Before TVer, I led the in-housing of Voicy's iOS app — an audio streaming platform — introducing a multi-module architecture with 80%+ test coverage on new modules and reducing post-release bug reports by roughly 40%.

I also build for Android and Go on the backend, which lets me design features end to end rather than stopping at the app boundary.

Outside of work I speak at iOSDC Japan and help organize Swift愛好会 (Swift Lovers), a Japanese Swift community of 2,200+ engineers.

## Background

- Full-stack background from my SIer years — infrastructure, backend and frontend
- Ships production apps on both iOS and Android, not just one platform
- Introduces and runs agile practices to move teams and projects forward
- Comfortable with stakeholder alignment and prioritization as a team lead

## What I do best

- Video playback and ad monetization on mobile — player architecture, live and VOD
- Audio and live streaming infrastructure
- Product-minded engineering — deciding what to build from a business perspective, not only a technical one

# Output

## Talks

- “Core Audio” at iOSDC Japan 2024
  [Details](https://fortee.jp/iosdc-japan-2024/proposal/8c6f01d9-8fd3-4d5e-afef-f29d561f3c39)
- “Everything behind audio broadcasting on iOS” at iOSDC Japan 2022
  [Details](https://fortee.jp/iosdc-japan-2022/proposal/ee2ab807-9053-4779-84f9-ec9951f7cfc0)
- “How to replace an existing native app with Flutter” at iOSDC Japan 2021
  [Details](https://iosdc.jp/2021/) / [Speaker Deck](https://speakerdeck.com/entaku/pickgo-for-partnerfalseyi-xing-fang-fa-karaxue-hu-ji-cun-falseneiteihuahuriwoflutterherihureisusurufang-fa)
- “Becoming an iOS OSS contributor through the DroidKaigi official app” at iOSDC Japan 2020
  [Details](https://fortee.jp/iosdc-japan-2020/proposal/c3c70224-08cf-48d7-b5e5-a3d4589737fa) / [Speaker Deck](https://speakerdeck.com/entaku/droidkaigifalsegong-shi-ahuriteshi-meru-iosahuriosskomitutahefalsedao)
- “Understanding Vue / Vuex architecture, completely” at Vue.js Architecting Meetup
  [Details](https://cw-engineers.connpass.com/event/146975/) / [Speaker Deck](https://speakerdeck.com/entaku/vue-vuex-falseakitekutiyawan-quan-nili-jie-sita)

## Community

- **Swift愛好会 (Swift Lovers)** Organizer
  Organizer of a Japanese Swift community with 2,200+ engineers, running meetups once or twice a month (98 editions and counting).
  [Swift愛好会 (Swift Lovers)](https://love-swift.connpass.com/)
- **DroidKaigi** Staff
  Staff member of DroidKaigi, the largest Android developer conference in Japan.
  [DroidKaigi](https://droidkaigi.jp/)

[![trophy](https://github-profile-trophy.vercel.app/?username=entaku0818&theme=light)](https://github.com/entaku0818)

## Experience

### TVer (Jan 2025 - Present)

[TVer Website](https://tver.jp/)

#### Project overview

iOS lead engineer at TVer, one of Japan's largest free ad-supported streaming services, working on the video playback experience and the ad integration around it.

#### Highlights

**Video playback and ad monetization**

- Work on player features for both live and on-demand streaming, including the ad integration layer around playback
- Replaced playback-related code with The Composable Architecture, improving maintainability and testability

**Large-scale live event delivery**

- Delivered the streaming experience for the Milano Cortina 2026 Winter Olympics, including a dedicated top screen and event UI
- Built reusable player modules covering both live and VOD playback under a hard, externally fixed deadline

**CI with Xcode Cloud**

- Tests existed but there was no CI. Introduced Xcode Cloud so every pull request runs automated tests and build verification
- Stabilized the development cycle for the whole iOS team

**Onboarding redesign**

- Rebuilt the walkthrough flow so new users understand the app immediately

#### Tech stack

- Language: Swift
- Frameworks: SwiftUI / UIKit / Combine / TCA
- Playback: AVFoundation / AVPlayer
- CI/CD: Xcode Cloud

### Voicy (Dec 2021 - Dec 2024)

[Voicy Website](https://voicy.jp/)

#### Project overview

iOS engineer and team lead at Voicy, an audio streaming platform. As the owner of the recording app for creators, I led the move from outsourced development to an in-house team, the architecture overhaul, and new feature development.

#### Highlights

**In-housing development and rebuilding code quality**

- The app had been outsourced since the company's founding, had no unit tests, and relied on manual QA to catch bugs
- Introduced a multi-module architecture and reached 80%+ test coverage on new modules
- Drove incremental refactoring with four iOS/Android engineers without pausing feature work, cutting post-release bug reports by about 40%

**Collaborative recording**

- Designed and built a feature that lets creators record together remotely
- Introduced agile practices, reviewing increments weekly with the PdM and running mid-development validation with five creators
- 100+ creators adopted collaborative recording after launch

**Live broadcasting**

- Implemented real-time audio broadcasting on both iOS and Android using Agora
- Built the creation, start and scheduling screens from scratch, including pre-broadcast checks for network state and permissions
- Enabled low-latency delivery and listener participation for two-way communication

**Backend (Go) API development**

- Designed and implemented the session API for collaborative recording with OpenAPI
- Built the live broadcasting database and its APIs around Agora
- Developed the APIs for room admission, rejection and exit flows

**Android work**

- Designed and implemented creator-only comment display and control, including broadcast-type detection
- Migrated the Android recording app's UI components to Material 3

**Hiring**

- Ran first-round engineering interviews, assessing both technical skill and culture fit
- Contributed to three hires that strengthened the team

#### Tech stack

- Languages: Swift / Kotlin / Go
- Frameworks: SwiftUI / UIKit / RxSwift / Jetpack Compose
- Audio & streaming: AVFoundation / Agora SDK / ExoPlayer
- Architecture: Multi-module / MVVM
- Other: XCTest / GitHub Actions

### CBCloud (Apr 2019 - Nov 2021)

[CBCloud Website](https://cb-cloud.com/)

#### Project overview

Worked on PickGo, a delivery matching platform, and SmaRyuTruck, a SaaS for freight carriers. Moved from mobile engineer to team lead, contributing on both development and customer-facing work.

#### Highlights

**Team lead on the SmaRyuTruck launch**

- Volunteered to take over as team lead partway through the project
- Coordinated development priorities and bridged stakeholders while the CEO acted as product owner
- Visited customers directly to understand real logistics operations and fed those findings into product requirements
- Built the [freight delivery request page](https://pickgo.town/)

**Rebuilding the PickGo team**

- After a wave of departures I was the only remaining developer on the product
- Got up to speed on the existing codebase and business flows quickly enough to keep shipping
- Delivered the [JAL air freight integration](https://press.jal.co.jp/ja/release/202103/005969.html) alone, from requirements to release
- Implemented dynamic delivery pricing that responds to seasonal demand

**Hiring**

- Ran first-round engineering interviews

#### Deliverables

- [SmaRyuTruck](https://smaryu.town/truck/) - SaaS for freight carriers
- [PickGo](https://pickgo.town/) - Delivery matching platform
- [Shopping proxy service](https://pickgo.town/consumer/shopping)

#### Tech stack

- Mobile: Swift / Kotlin
- Frontend: Nuxt.js
- Backend: Rails

### Lifesports (Feb 2018 - Mar 2019)

[Lifesports Website](https://lifesports.jp/)

#### Project overview

Mobile app development for a sports matching service, focused on feature improvements for user growth and a new community feature.

#### Highlights

- Improved existing features and UI/UX to grow the user base
- Designed and implemented a community feature connecting sports enthusiasts

#### Tech stack

- Mobile: Swift / Kotlin
- Backend: Laravel

### AP Communications (Sep 2013 - Feb 2018)

[AP Communications Website](https://www.ap-com.co.jp/)

#### Project overview

Started my career at a network-focused SIer, covering everything from infrastructure to application development after moving to the development division.

#### Highlights

- Operated and maintained a network authentication system for a major Japanese enterprise
- Joined a large-scale system replacement project, handling infrastructure setup through migration
- After moving to the development division, maintained and replaced systems for education and entertainment businesses

#### Tech stack

- Backend: Java (Spring) / PHP (Laravel)
- Database: MySQL
- Infrastructure: Network design & operations

## Side Projects

### ishin — Mobile Engineer (Jul 2025 - Mar 2026)

Contributed to ishin, a voice talk room service where AI avatars can join conversations. Worked across three areas: the mobile app, the backend API and the web front end.

**Highlights**

- Built talk room join UI, ripple animations and AI avatar selection in React Native (Expo SDK 52)
- Designed AI avatar badges, auto-response triggers and a message display queue system
- Implemented follow and block features on both the mobile app and the API
- Built event tracking for room joins and creations via Firebase Analytics and BigQuery
- Handled App Store submission work: App Tracking Transparency, GIF compression and EAS build size optimization
- Optimized OGP image generation in ishin-web (Next.js): 6.6x faster (11s → 1.75s) via font and memory caching
- Developed heartbeat, BigQuery sync and AI avatar management endpoints in the Go backend

**Tech stack:** React Native / Expo / TypeScript / Go / Next.js / Firebase / BigQuery / Auth0 / EAS

### linq — iOS Engineer (Apr 2023 - Apr 2024)

[linq Website](https://linq.co.jp/)

Joined iOS development for whoo, a location sharing app.

**Highlights**

- Drove the incremental migration from UIKit to SwiftUI
- Built new features for sending stamps to friends on the map, and messaging
- Implemented interactive animations that encourage user-to-user interaction

**Tech stack:** SwiftUI / UIKit / MapKit / CoreLocation / Core Animation

### SOXAI Healthcare App (Nov 2022 - Mar 2023)

[SOXAI Website](https://soxai.co.jp/)

Joined mobile development for a healthcare app.

**Highlights**

- Developed with [Quasar](https://quasar.dev/), a cross-platform framework
- Designed and implemented the graph screens visualizing health data

### nossa360 — Android Engineer (Apr 2020 - Mar 2021)

[nossa360 Website](https://lp.nossa360biz.com/)

Android development for nossa360, a 360-degree camera app for the construction and real estate industries.

**Highlights**

- Implemented 360-degree capture using the Camera2 API
- Improved app performance through image processing optimization
- Refined the UI/UX for use on construction sites

**Tech stack:** Kotlin / Camera2 API / Image processing

## Personal Apps

### Simple Voice Recorder (iOS / Android)

A voice recorder built around one-tap recording. It supports background recording, playlists and recording time on the lock screen, and ships in English, Japanese, Chinese and Spanish among others.

**Tech stack:** Swift / SwiftUI / AVFoundation / CloudKit / Kotlin / Android Jetpack / Room / WorkManager

[App Store](https://apps.apple.com/us/app/simple-voice-recorder-audio/id6443528409) / [Google Play](https://play.google.com/store/apps/details?id=com.entaku.simpleRecord)

### Simple Transcription (iOS)

A transcription app that turns speech into text. Recognition runs on device, which makes it practical for recordings and meeting notes.

**Tech stack:** Swift / SwiftUI / Core ML / Speech / Natural Language

[App Store](https://apps.apple.com/jp/app/id6504149514)

### Voice Narrator (iOS)

A text-to-speech app. I built it to try the iOS audio and speech APIs on a real product, and keep improving it based on user feedback.

**Tech stack:** Swift / SwiftUI / AVFoundation / Speech / Core Audio

[App Store](https://apps.apple.com/jp/app/読み上げナレーター-声で読み上げ/id6478449537)

### Japanese Rhyme Finder (iOS)

A tool that analyses Japanese rhymes and suggests candidates. I wrote the detection logic myself, based on vowel sequences and tuned for Japanese phonology.

**Tech stack:** Swift / Natural Language / Core ML

# More

- More about me  
  [personal.en.md](personal.en.md)
