import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../interfaces/auth.interface';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  currentPage = 1;
  pageSize = 100;
  loading = false;
  hasMorePlayers = true;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.loading = true;
    console.log('Initial load - Page:', this.currentPage);
    this.playersService.getPlayers(this.currentPage, this.pageSize).subscribe({
      next: (players) => {
        console.log('Received initial players:', players.length);
        this.players = players;
        this.loading = false;
        if (players.length < this.pageSize) {
          this.hasMorePlayers = false;
        }
      },
      error: (error) => {
        console.error('Failed to load players:', error);
        this.loading = false;
      }
    });
  }

  loadMorePlayers() {
    this.loading = true;
    this.currentPage++;
    console.log('Loading more - Page:', this.currentPage);

    this.playersService.getPlayers(this.currentPage, this.pageSize).subscribe({
      next: (newPlayers) => {
        console.log('Received new players:', newPlayers.length);
        if (newPlayers.length < this.pageSize) {
          this.hasMorePlayers = false;
        }
        this.players = [...this.players, ...newPlayers];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading more players:', error);
        this.loading = false;
      }
    });
  }

  getCountryCode(team: string): string {
    // Add mappings for your teams to their country codes
    let teams = team?.split('/');
    let actualteam;
    if (teams?.length > 1) {
      actualteam = teams.filter((t: string) => {
        return t !== 'Icc' && t !== 'World'
      })[0];
    } else {
      actualteam = team
    }


    const countryMap: { [key: string]: string } = {
      'India': 'in',
      'Nz': 'nz',
      'Pak': 'pk',
      'Eng': 'gb-eng',
      'Afg': 'af',
      'Aus': 'au',
      'Wi': 'tt',
      'Zim': 'zw',
      'Bdesh': 'bd',
      'Sa': 'za',
      'Ire': 'ie',
      'Sl': 'lk',
      'Nepal': 'np',
      'Scot': 'gb-sct',
      'Uae': 'ae',
      'Nl': 'nl',
      'Kenya': 'ke',
      'Png': 'pg',
      'Uga': 'ug',
      'Jer': 'je',
      "Afghanistan": "AF",
      "Albania": "AL",
      "Algeria": "DZ",
      "Andorra": "AD",
      "Angola": "AO",
      "Antigua and Barbuda": "AG",
      "Argentina": "AR",
      "Armenia": "AM",
      "Australia": "AU",
      "Aut": "AT",
      "Azerbaijan": "AZ",
      "Bah": "BS",
      "Bahrain": "BH",
      "Bangladesh": "BD",
      "Gibr": "GI",
      "Barbados": "BB",
      "Belarus": "BY",
      "Belgium": "BE",
      "Belize": "BZ",
      "Benin": "BJ",
      "Bhutan": "BT",
      "Bolivia": "BO",
      "Bosnia and Herzegovina": "BA",
      "Botsw": "BW",
      "Brazil": "BR",
      "Brunei": "BN",
      "Bulgaria": "BG",
      "Burkina Faso": "BF",
      "Burundi": "BI",
      "Cabo Verde": "CV",
      "Cambodia": "KH",
      "Cameroon": "CM",
      "Can": "CA",
      "Central African Republic": "CF",
      "Chad": "TD",
      "Chile": "CL",
      "China": "CN",
      "Colombia": "CO",
      "Comoros": "KM",
      "Hkg": "HK",
      "Congo (Congo-Brazzaville)": "CG",
      "Congo (Congo-Kinshasa)": "CD",
      "Costa Rica": "CR",
      "Croatia": "HR",
      "Cuba": "CU",
      "Cyprus": "CY",
      "Czk-R": "CZ",
      "Den": "DK",
      "Djibouti": "DJ",
      "Dominica": "DM",
      "Dominican Republic": "DO",
      "Gue": "GT",
      "Ecuador": "EC",
      "Egypt": "EG",
      "El Salvador": "SV",
      "Equatorial Guinea": "GQ",
      "Eritrea": "ER",
      "Estonia": "EE",
      "Eswatini": "SZ",
      "Ethiopia": "ET",
      "Fiji": "FJ",
      "Fin": "FI",
      "France": "FR",
      "Gabon": "GA",
      "Gambia": "GM",
      "Georgia": "GE",
      "Ger": "DE",
      "Ghana": "GH",
      "Greece": "GR",
      "Grenada": "GD",
      "Guatemala": "GT",
      "Guinea": "GN",
      "Guinea-Bissau": "GW",
      "Guyana": "GY",
      "Haiti": "HT",
      "Honduras": "HN",
      "Hungary": "HU",
      "Iceland": "IS",
      "Indonesia": "ID",
      "Iran": "IR",
      "Iraq": "IQ",
      "Ireland": "IE",
      "Israel": "IL",
      "Italy": "IT",
      "Jamaica": "JM",
      "Japan": "JP",
      "Jordan": "JO",
      "Kazakhstan": "KZ",
      "Kiribati": "KI",
      "Kuw": "KW",
      "Kyrgyzstan": "KG",
      "Laos": "LA",
      "Latvia": "LV",
      "Lebanon": "LB",
      "Lesotho": "LS",
      "Liberia": "LR",
      "Bmuda": "BM",
      "Libya": "LY",
      "Liechtenstein": "LI",
      "Lithuania": "LT",
      "Luxembourg": "LU",
      "Madagascar": "MG",
      "Mwi": "MW",
      "Mal": "MY",
      "Mald": "MV",
      "Mali": "ML",
      "Malta": "MT",
      "Marshall Islands": "MH",
      "Mauritania": "MR",
      "Mauritius": "MU",
      "Mex": "MX",
      "Micronesia": "FM",
      "Moldova": "MD",
      "Monaco": "MC",
      "Mongolia": "MN",
      "Montenegro": "ME",
      "Morocco": "MA",
      "Moz": "MZ",
      "Myanmar": "MM",
      "Nam": "NA",
      "Nauru": "NR",
      "Netherlands": "NL",
      "New Zealand": "NZ",
      "Nicaragua": "NI",
      "Niger": "NE",
      "Nga": "NG",
      "North Korea": "KP",
      "North Macedonia": "MK",
      "Norway": "NO",
      "Oman": "OM",
      "Pakistan": "PK",
      "Palau": "PW",
      "Palestine": "PS",
      "Pnm": "PA",
      "Papua New Guinea": "PG",
      "Paraguay": "PY",
      "Peru": "PE",
      "Philippines": "PH",
      "Poland": "PL",
      "Port": "PT",
      "Qat": "QA",
      "Rom": "RO",
      "Russia": "RU",
      "Rwanda": "RW",
      "Saint Kitts and Nevis": "KN",
      "Saint Lucia": "LC",
      "Saint Vincent and the Grenadines": "VC",
      "Samoa": "WS",
      "San Marino": "SM",
      "Sao Tome and Principe": "ST",
      "Saudi": "SA",
      "Senegal": "SN",
      "Serbia": "RS",
      "Seychelles": "SC",
      "Sierra Leone": "SL",
      "Sgp": "SG",
      "Slovakia": "SK",
      "Slovenia": "SI",
      "Solomon Islands": "SB",
      "Somalia": "SO",
      "South Africa": "ZA",
      "South Korea": "KR",
      "South Sudan": "SS",
      "Esp": "ES",
      "Sri Lanka": "LK",
      "Sudan": "SD",
      "Suriname": "SR",
      "Sweden": "SE",
      "Switzerland": "CH",
      "Syria": "SY",
      "Taiwan": "TW",
      "Tajikistan": "TJ",
      "Tanzania": "TZ",
      "Thailand": "TH",
      "Timor-Leste": "TL",
      "Togo": "TG",
      "Tonga": "TO",
      "Trinidad and Tobago": "TT",
      "Tunisia": "TN",
      "Turkey": "TR",
      "Turkmenistan": "TM",
      "Tuvalu": "TV",
      "Uganda": "UG",
      "Ukraine": "UA",
      "United Arab Emirates": "AE",
      "United Kingdom": "GB",
      "Usa": "US",
      "Uruguay": "UY",
      "Uzbekistan": "UZ",
      "Van": "VU",
      "Vatican City": "VA",
      "Venezuela": "VE",
      "Vietnam": "VN",
      "Yemen": "YE",
      "Zambia": "ZM",
      "Zimbabwe": "ZW"
      // Add more mappings as needed
    };

    return countryMap[actualteam] || 'unknown';
  }
}
