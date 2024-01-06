# Marvel Blog

[![GitHub repository](https://img.shields.io/badge/github-sharpWit%2Fmarvel--fun-blue?style=flat&logo=github)](https://github.com/sharpWit/marvel-fun)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/sharpWit/marvel-fun)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/sharpWit/marvel-fun/blob/main/LICENSE)

## Description

Marvel Blog is a conceptualized and developed creative comic website that demonstrates proficiency in frontend development. It utilizes NextJS v14 and showcases design versatility in presenting conceptual art and blog content related to Marvel comics.

## Author

Saeed Khosravi

My Github
[![GitHub repository](https://img.shields.io/badge/github-sharpWit-blue?style=flat&logo=github)](https://github.com/sharpWit/)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Requirement](#requirement)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Requirement

To ensure the seamless functionality of Marvel Blog, it is essential to obtain API access from Marvel. Follow these steps to acquire the necessary API key:

1. Visit [Marvel Developer Portal](https://developer.marvel.com/).
2. Read through the documentation to familiarize yourself with the Marvel API.
3. Sign up for an account if you haven't already and log in.
4. Navigate to the "Get A Key" section to obtain your unique public and private API keys.

Once you have your Marvel API keys, create an `.env*.local` file in the root of your project and add the following:

```env
NEXT_PUBLIC_MARVEL_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_MARVEL_PRIVATE_KEY=your_private_key
```

Replace your_public_key and your_private_key with the corresponding keys you obtained from the Marvel Developer Portal.

This step is crucial for enabling Marvel Blog to fetch and display content from the Marvel API. Make sure to keep your API keys secure and avoid sharing them publicly. If you have any concerns or questions regarding Marvel's API usage policies, refer to the Marvel API Terms of Use.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sharpWit/marvel-fun.git
   cd marvel-fun
   ```

2. Install dependencies:

   ```bash

   npm install
   ```

3. Usage

   To run the application locally, use the following command:

   ```bash

   npm run dev
   ```

   Visit http://localhost:3000 in your browser to view the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
