import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import Footer from "./components/Footer";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from './config.js';
import AWS from 'aws-sdk';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      accessToken: null,
      isLoadingUserToken: true,
      username: null,
      isLoggedIn: false,
      profile: {},
      phone: {},
      industries: [
        {'Agriculture': ['Livestock', 'Planting', 'Harvesting', 'Digging', 'Machinery Operation', 'Plowing', 'Waste Management', 'Landscaping']},
        {'Construction': ['Electrical Work', 'Carpentry', 'Plumbing', 'Labour', 'Concrete', 'Formworking', 'Scaffolding', 'Plastering', 'Bricklaying', 'Glazing', 'Painting', 'Stonework', 'Landscaping', 'Paving & Surfacing', 'Heating, Ventilation & Air Conditioning (HVAC)', 'Roofing']},
        {'Engineering': ['Computer Modeling', '3D CAD/CAE Modeling', 'Architecture', 'Chemical Engineering', 'Civil & Structural Engineering', 'Electrical Engineering', 'Interior Design', 'Product Design','Manufacturing Process', 'Machine Design', 'Fluid Mechanics', 'Solid Mechanics', 'Statistical Analysis', 'Process Analysis', 'Material Handling' ]},
        {'Writing': ['All Writing', 'Academic Writing & Research', 'Article & Blog Writing', 'Copywriting', 'Creative Writing', 'Editing & Proofreading', 'Grand Writing', 'Resumes & Cover Letters', 'Technical Writing', 'Web Content', 'Transcription', 'Web Research']},
        {'Professional': ['Shopkeeping', 'Data-Collection', 'Management Consulting', 'Customer Service', 'Technical Support', 'Data-Entry','Surveying', 'Accounting', 'Financial Analysis', 'Sales', 'Human Resources','Inventory Management', 'Administrative Support', 'Personal/Virtual Assistant', 'Project Management']},
        {'Legal': ['Contract Law', 'Corporate Law', 'Criminal Law', 'Family Law', 'Immigration Law', 'Intellectual Property Law', 'Paralegal Services']},
        {'Sales-Marketing': ['Display Advertising', 'Email & Marketing Automation', 'Lead Generation', 'Market & Customer Research', 'Marketing Strategy', 'Public Relations', 'SEM - Search Engine Marketing', 'SEO - Search Engine Optimization', 'SMM - Social Media Marketing', 'Telemarketing & Telesales']},
        {'Translation': ['General Translation', 'Legal Translation', 'Medical Translation', 'Technical Translation', 'English & Swahili', 'English & Bantu', 'English & Nilotic', 'English & Central Sudanic', 'English & Chinese']},
        {'Creative-arts': ['Graphic Design', 'Brand Merchandising', 'Voice-over Talent & Singing', 'Videography', 'Printing', 'Photography', 'Audio Production', 'Illustration']},
        {'Technology': ['Database Administration', 'IT & Networking', 'Microsoft IT Administration', 'Active-X Directory', 'Amazon Web Services', 'Google Cloud', 'Microsoft Azure Cloud', 'Product Management', 'ERP & CRM Software', 'Information Security' ]},
        {'Software-Development': ['Web Development', 'Mobile Application Development', 'Video game development','QA & Testing', 'SQL', 'PhP', 'Node.js', 'Java', 'React.js', 'React Native', 'Swift', 'Objective C','C', 'C++']},
        {'Tourism': ['Ugandan History', 'Guiding','Zoology', 'Geography & Navigation', 'Driving', 'Interpersonal Communication', 'Travel Planning & Advisory']},
        {'Food-Service': ['Food Preparation', 'Catering', 'Food Service', 'Uganda Cuisine', 'English Cuisine', 'European Cuisine', 'Chinese Cuisine', 'Bartending']},
      ],
      jobs: [],
      universities : [
        { "abbrevation" : "BUS", "name": "Busitema University"},
        { "abbreviation": "GU", "name" : "Gulu University"},
        { "abbreviation": "KABU", "name" : "Kabale University"},
        { "abbreviation": "KYU", "name" : "Kyambogo University"},
        { "abbreviation": "LU", "name" : "Lira University"},
        { "abbreviation": "MUK", "name" : "Makerere University"},
        { "abbreviation": "MUBS", "name" : "Makerere University Business School"},
        { "abbreviation": "MUST", "name" : "Mbarara University of Science and Technology"},
        { "abbreviation": "MU", "name" : "Muni University"},
        { "abbreviation": "SUN", "name" : "Soroti University"},
        { "abbreviation": "UMI", "name" : "Uganda Management Institute"},


        { "abbreviation": "AGU", "name" : "Africa Graduate University"},
        { "abbreviation": "AfRU", "name" : "Africa Renewal University"},
        { "abbreviation": "ABU", "name" : "Africa Bible University"},
        { "abbreviation": "ARUW", "name" : "Africa Rural University"},
        { "abbreviation": "AKU", "name" : "Aga Khan University"},
        { "abbreviation": "ASU", "name" : "All Saints University"},
        { "abbreviation": "AWU", "name" : "Ankole Western University"},
        { "abbreviation": "BSU", "name" : "Bishop Stuart University"},
        { "abbreviation": "BMU", "name" : "Bugema University"},
        { "abbreviation": "BGU", "name" : "Busoga University"},
        { "abbreviation": "CUU", "name" : "Cavendish University Uganda"},
        { "abbreviation": "GLRU", "name" : "Great Lakes Regional University"},
        { "abbreviation": "IHSU", "name" : "International Health Sciences Univeristy"},
        { "abbreviation": "IUEA", "name" : "International University of East Africa"},
        { "abbreviation": "IUIU", "name" : "Islamic University in Uganda"},
        { "abbreviation": "KIU", "name" : "Kampala International University"},
        { "abbreviation": "KU", "name" : "Kampala University"},
        { "abbreviation": "KUMU", "name" : "Kumi University"},
        { "abbreviation": "LSIU", "name" : "Livingstone International University"},
        { "abbreviation": "MRU", "name" : "Muteesa I Royal University"},
        { "abbreviation": "MMU", "name" : "Mountains of the Moon University"},
        { "abbreviation": "NDU", "name" : "Ndejje University"},
        { "abbreviation": "NKU", "name" : "Nkumba University"},
        { "abbreviation": "NSU", "name" : "Nsaka University"},
        { "abbreviation": "SAIU", "name" : "St Augustine International University"},
        { "abbreviation": "SLAU", "name" : "St Lawrence University"},
        { "abbreviation": "SIU", "name" : "Stafford University Uganda"},
        { "abbreviation": "UCU", "name" : "Uganda Christian University"},
        { "abbreviation": "UMU", "name" : "Uganda Martyrs University"},
        { "abbreviation": "UNIK", "name" : "University of Kisubi"},
        { "abbreviation": "UPU", "name" : "Uganda Pentecostal University"},
        { "abbreviation": "USHG", "name" : "University of Sacred Heart Gulu"},
        { "abbreviation": "UTAMU", "name" : "Uganda Technology and Management University"},
        { "abbreviation": "VU", "name" : "Victoria University"},
        { "abbreviation": "VUU", "name" : "Virtual University of Uganda"},
        { "abbreviation": "IU", "name" : "Ibanda University"},
        { "abbreviation": "LKU", "name" : "Limkokwing University of Creative Technology"},


        { "abbreviation": "UMST", "name" : "University of Military Science and Technology"},
        { "abbreviation": "UMA", "name" : "Uganda Military Academy"},
        { "abbreviation": "USCSC", "name" : "Uganda Senior Command and Staff College"},
        { "abbreviation": "UJCSC", "name" : "Uganda Junior Staff College"},


        { "abbreviation": "KPI", "name" : "Kigumba Petroleum Institute"},
        { "abbreviation": "IAIT", "name" : "India Africa Institute of Trade"},
        { "abbreviation": "ISBAT", "name" : "International School of Business and Technology"},
        { "abbreviation": "IPSK", "name" : "Institute of Petroleum Studies Kampala"},
        { "abbreviation": "OTHER", "name": "Other"}
      ],
      courses : [
        {"code": "BscCS", "name": "Bachelor of Science in Computer Science"},
        { "code": "BscAGR", "name": "Bachelor of science in Agriculture"},
        { "code":"BscFST", "name":"Bachelor of science in food science and Technology"},
        { "code":"BscAGE", "name": "Bachelor of science in agricultural Engineering" },
        { "code":"BscBAR", "name": "Bachelor of Agricultural and rural innovation"},
        {"code": "BscBAM", "name": "Bachelor of science in Agricultural land use and management"},
        { "code": "BscHOT", "name":  "Bachelor of science in Hoticulture"},
        { "code":"BscAGM", "name": "Bachelor of Agribusiness Management" },
        {"code": "BscHUN", "name": "Bachelor of science in Human Nutrition"},
        {"code": "BscBVS", "name": "Bachelor of enviromental Science"},
        {"code": "BscFOR", "name": "Bachelor of conservation Forestry and Products Technology"},
        { "code": "BscBCF", "name": "Bachelor of Social and Enterpreneural Forestry"},
        { "code": "BaECO",  "name": "Bachelor Of Arts In Economics"},
        { "code": "BaDEC",   "name": "Bachelor Of Arts In Development Economics"},
        { "code": "BscBCO" ,  "name": "Bachelor Of Commerce"},
        {"code": "BscBBA", "name": "Bachelor Of Business Administration"},
        { "code": "BscBST",  "name": "Bachelor Of Statistics"},
        { "code": "BscBQE",  "name": "Bachelor Of Science In Quantitative Economics"},
        {"code": "BscBPS",  "name": "Bachelor Of Science In Population Studies"},
        {"code": "BscSAS",  "name": "Bachelor Of Science In Actuarial Science"},
        { "code": "BscBBS",  "name": "Bachelor Of Science In Business Statistics"},
        {"code": "BscBTJ", "name": "Bachelor of Tourism"}, 
        {  "code": "BaBCM",  "name": "Bachelor of Catering and Hotel Management"},
        { "code": "BaBHM",  "name": "Bachelor of Human Resource Management"},
        { "code": "BscBIB",  "name": "Bachelor of International Business"},
        { "code": "BscBLH",   "name": "Bachelor of leisure and Hospitality Management"},
        { "code": "BscBBC",  "name": "Bachelor of Business Computing"},
        { "code": "BscPSM",  "name": "Bachelor of Procurement and Supply chain Mgt"},
        { "code": "BaBRM",  "name": "Bachelor of Real Estate Business Management"},
        { "code": "BaBLG", "name":"Bachelor of Leadership and Governance"},
        { "code": "BscBSF", "name": "Bachelor of Science in Finance"},
        { "code": "BscBSA",  "name": "Bachelor of Science in Accounting"},
        { "code": "BscLMD",  "name": "Bachelor of Science in Sport and Leisure Management"},
       { "code": "BscSAD",  "name": "Bachelor of Science in Sport and Exercise Instruction"},
       { "code": "BscBTT",  "name": "Bachelor of Travel and Tourism Management"},
       { "code": "BaBES",  "name": "Bachelor of Entreprenuership and Small Business Mgt"},
       { "code": "BaBUS", "name": "Bachelor of Business Statistics"},
       { "code": "BscCHD",  "name": "Bachelor of Science in Chemical Engneering"},
       { "code": "BscBCS", "name": "Bachelor Of Science In Computer Science"},
       {  "code": "BscBIT", "name": "Bachelor Of Information Technology"},
       { "code": "BscBIS", "name": "Bachelor Of Information System"},
       { "code": "BscBSW",  "name": "Bachelor Of Science In Software Engineering"},
       { "code": "LIS",  "name": "Bachelor Of Library And Information Science"},
       { "code": "BRA", "name": "Bachelor Of Records And Archives Management"},
       { "code": "BaEDA", "name": "Bachelor Of Arts With Education"},
       { "code": "BscEDS", "name": "Bachelor Of Science With Education"},
       { "code" :"BscSEA", "name": "Bachelor Of Science Education (Agriculture)"},
       { "code": "BscBSS", "name": "Bachelor Of Science Education (Sports science)"},
       { "code": "BscESE",  "name": "Bachelor of Science with Education (Economics)"},
       { "code": "BscESB", "name": "Bachelor of Science with Education (Biological Sciences)"},
       { "code": "BaBAC", "name": "Bachelor Of Adult And Community Education"},
       { "code": "BscCOX", "name": "Bachelor Of Commerce"},
       { "code": "BscSCX", "name": "Bachelor Of Science"},
       { "code": "BED", "name":"Bachelor Of Education"},
       { "code": "BscBBE", "name":"Bachelor of Business Education"},
       { "code": "BscCIV", "name": "Bachelor Of Science In Civil Engineering"},
       { "code": "BscELE", "name": "Bachelor Of Science In Electrical Engineering"},
       { "code": "BscMEC", "name": "Bachelor Of Science In Mechanical Engineering"},
       { "code": "BscSUR", "name": "Bachelor Of Science In Surveying"},
       { "code": "BscARC", "name": "Bachelor Of Architecture"},
       { "code": "BscSQS", "name": "Bachelor Of Science In Quantity Surveying"},
       { "code": "BscSLE", "name": "Bachelor Of Science In Land Economics"},
       { "code": "BscSCM",  "name":"Bachelor Of Science In Construction Management"},
       { "code": "BscSTE", "name": "Bachelor Of Science In Telecommunications Engineering"},
       { "code": "BscCMP", "name":"Bachelor Of Science In Computer Engineering"},
       { "code": "BscEED", "name": "Bachelor of Engineering in Environmental Engineering and Management"},
       { "code": "BscAPD", "name": "Bachelor of Engineering in Automotive and Power Engineering"},
       { "code": "BscIED", "name" : "Bachelor of Engineering in Industrial Engineering and Management"},
       { "code": "BscBIO",  "name":"Bachelor of Mechatronics and Biomedical Engineering"},
       { "code": "BaSOC", "name":"Bachelor of Social Work and Social Administration"}, 
       { "code": "BaaASS", "name":"Bachelor of Arts (Social Sciences)" },
       { "code": "BaBJC", "name": "Bachelor of Journalism and Communication" },
       { "code": "BAS", "name": "Bachelor of Arts (Arts)"}, 
       { "code": "BaDVS", "name": "Bachelor of Development Studies" },
       { "code": "BaMUS", "name": "Bachelor of Arts in Music"}, 
       { "code": "BaBDF", "name": "Bachelor of Arts in Drama and Film" },
       { "code": "BaBCO", "name": "Bachelor of Community Psychology"}, 
       { "code": "BscBIP", "name" :"Bachelor of Industrial and Organisational Psychology" },
       { "code": "BaEHR", "name": "Bachelor of Arts in Ethics and Human Rights"}, 
       { "code": "BGD", "name": "Bachelor of Guidance and Counselling"},
       { "code": "BRD", "name": "Bachelor of Demography & Reproductive Health"},
       { "code": "BscBIC", "name": "Bachelor of Science in Industrial Chemistry"}, 
       { "code": "BscBFS", "name": "Bachelor of Science in Fisheries and Aquaculture" },
       { "code": "BscBSP", "name": "Bachelor of Sports Science"}, 
       { "code": "BscSCB", "name": "Bachelor of Science – BIOLOGICAL" },
       { "code": "BscSCP", "name": "Bachelor of Science – PHYSICAL"}, 
       { "code": "BscSEC", "name" : "Bachelor of Science – ECONOMICS"},
       { "code": "BscBPG", "name": "Bachelor of Science in Petroleum Geoscience & Production"},
       { "code": "BscBCB", "name": "Bachelor of Science in Conservation Biology" },
       { "code": "BscETB", "name": "Bachelor of Science in Ethnobotany"}, 
       { "code": "BscBBT", "name": "Bachelor of Science in Biotechnology" },
       { "code": "BscGPD", "name": "Bachelor of Science in Oil and Gas Production"},
       { "code": "BscMCD", "name": "Bachelor of Material and Ceramic Science Technology"},
       { "code": "BscLTD", "name": "Bachelor of Science in Leather Tanning Technology"},
       { "code": "BscPTD", "name": "Bachelor of Science Technology –Physics"},
       { "code": "BscCTD", "name": "Bachelor of Science Technology –Chemistry"},
       { "code": "BScBTD", "name": "Bachelor of Science Technology –Biology"},
       { "code": "BscVTD", "name": "Bachelor of Vocational Studies in Technological Studies with Education"},
       { "code": "BscVET", "name": "Bachelor of Veterinary Medicine" },
       { "code": "BscWHM", "name": "Bachelor of Science In Wildlife Health and Management"}, 
       { "code": "BscMLT", "name": "Bachelor of Biomedical Laboratory Technology"}, 
       { "code": "BscBAP", "name": "Bachelor of Animal Production Technology and Management"}, 
       { "code": "BscAFT", "name": "Bachelor of Science in Poultry Industry and Business" },
       { "code": "BscADI", "name": "Bachelor of Science in Dairy Industry and Business"}, 
       { "code": "BscAFI", "name": "Bachelor of Science in Feed Industry and Business" },
       { "code": "BscAPI", "name": "Bachelor of Science in Pig Industry and Business" },
       { "code": "BscAFL", "name": "Bachelor of Science in Leather Industry and Business" },
       { "code": "BscABK", "name": "Bachelor of Science in Bee Industry and Business"}, 
       { "code": "BscAFM", "name": "Bachelor of Science in Meat Industry and Business" },
       { "code": "BscAFS", "name": "Bachelor of Science in Laboratory Science Education and Industry"}, 
       { "code": "BscAFM", "name": "Bachelor of Science in Wildlife Animal Industry and Business" },
       { "code": "LAW" , "name": "Bachelor of Laws"},
       //diplomas
       { "code": "DFT" , "name": "Diploma in Poultry Industry and Business"},
       { "code": "DDI" , "name": "Diploma in Dairy Industry and Business"},
       { "code": "DFI" , "name": "Diploma in Feed Industry and Business"}, 
       { "Code": "DFF" , "name": "Diploma in Fish Industry and Business" },
       { "code": "DPI" , "name": "Diploma in Pig Industry and Business"}, 
       { "code": "DFL" ,"name" : "Diploma in Leather Industry and Business"}, 
       { "code": "DBK", "name": "Diploma in Bee Industry and Business"}, 
       { "code": "DFM" , "name": "Diploma in Meat Industry and Business"}, 
       { "code": "DRI" , "name": "Diploma in Pet & Recreational Industry and Business"}, 
       { "code": "DFS", "name": "Diploma in Laboratory Science Education and Industry"}, 
       { "code": "DLP" , "name": "Diploma in Livestock Product Development & Entrepreneurship"}, 
       { "code": "DLH" , "name": "Diploma in Livestock Health Sciences"},
       { "code": "DPA", "name": "Diploma in Performing Arts"}, 
       { "code": "CSD", "name": "Diploma In Civil Engineering Surveying"},
       { "code": "CYP", "name": "Diploma In Youth In Development Work"},
       { "code": "ARM",  "name": "Diploma In Archives And Records Management"},
       { "code": "DCS", "name": "Diploma In Computer Science And Information Technology"},
       { "code": "DPJ",  "name": "Diploma in Project Planning Management"}, 
       { "code": "DID", "name": "Diploma in Interior Design"},
       { "code": "DHC", "name": "Diploma in Hotel and Institutional Catering"},
       { "code": "DER", "name": "Diploma in Ceramics"},
       { "code": "FAD", "name": "Diploma in Fashion and Apparel Design"},
       { "code": "TEX", "name": "Diploma in Textiles Design and Surface Design"},
       { "code": "HEC", "name": "Diploma in Home Economics Vocational Education Secondary"},
       { "code": "FIN",  "name": "Diploma in Education Secondary (Art & design)"},
       { "code": "SLI",  "name": "Diploma in Sign Language Interpreting"},
       { "code": "CBR", "name": "Diploma in Community Based Rehabilitation"},
       { "code": "MBR", "name": "Diploma in Mobility and Rehabilitation"},
       { "code": "STP", "name": "Diploma in Science Technology – Physics"},
       { "code": "STC", "name": "Diploma in Science Technology – Chemistry"},
       { "code": "STB", "name": "Diploma in Science Technology –Biology"},
       { "code":"DFP", "name": "Diploma in Food Processing Technology"},
       { "code": "MCT", "name": "Diploma in Material and Ceramic Science Technology"},
       { "code": "SME", "name": "Diploma in Sport Management and Administration"},
       { "code": "TDT", "name": "Diploma in Textile Design and Technology"},
       { "code": "ODE", "name": "Diploma in Electrical Engineering"}, 
       { "code": "ODC", "name": "Diploma in Civil and Building Engineering"},
       { "code": "ODM", "name": "Diploma in Mechanical Engineering"},
       { "code": "DCE", "name": "Diploma in Computer Engineering"},
       { "code": "DWE", "name": "Diploma in Water Engineering"},
       { "code": "ODA", "name": "Diploma in Architecture"},
       { "code": "DAE", "name": "Diploma in Automobile Engineering"},
       { "code": "DRA", "name": "Diploma in Refrigeration and Air Conditioning"},
       { "code": "OTD", "name": "Diploma in Telecommunication Engneering"},
       { "code": "DBE", "name": "Diploma in Biomedical Engineering"},
       { "code": "TEC", "name": "Diploma in Education Secondary (Technological Studies)"}, 
       { "code": "DCG", "name": "Diploma in Guidance and Counselling"},
       { "code": "EPM", "name": "Diploma in Educational Planning and Management"},
       { "code": "FRE", "name": "Diploma in Education Secondary (French)"},
       { "code": "DMF", "name": "Diploma in Micro Finance"},
       { "code": "DMU", "name": "Diploma in Education Secondary -Music"},
       { "code": "MTE", "name": "Diploma in Music and Theatre Arts"},
       { "code": "DPH", "name": "Diploma in Pharmacy"},
       { "code":"DDK", "name": "Diploma in Development Studies"},
       { "code":"SIM", "name": "Diploma in Secretarial Studies and Information Management"},
       //certificates
       { "code": "CST", "name": "Certificate in Science Laboratory Technology"},
       { "code": "CFP", "name": "Certificate in Food Processing Technology"},
       { "code": "CDB", "name": "Certificate in Deaf Blindness"},
       { "code": "CAC", "name": "Certificate in Adult and Community Education"},
       { "code": "CPT", "name": "Certificate in Printing Technology"},
       { "code": "CEC", "name": "Certificate in Early Childhood Education"},
       { "code": "CA", "name": "Certificate in Accountancy"},
       { "code": "CSS", "name": "Certificate in Secretarial Studies"},
       { "code": "CBM", "name": "Certificate in Business Management"},
       { "code": "CPSM", "name": "Certificate in Purchasing and Supplies Management"},
       { "code": "CGC", "name": "Certificate in Guidance and Counseling"},
       { "code": "CME", "name": "Certificate in Monitoring and Evaluation"},
       { "code": "CHR", "name": "Certificate in Human Resource Management"},
       { "code": "CRM", "name": "Certificate in Data and Records Management"},
       { "code": "CPPM", "name": "Certificate in Project Planning and Management"},
       { "code": "CPAM", "name": "Certificate in Public Administration and Management"},
       { "code": "CBAM", "name": "Certificate in Business Administration and Management"},
       { "code": "CPL", "name": "Certificate in Strategic Procurement and Logistics Management"},
       { "code": "CAL", "name": "Certificate in Administrative Law"},
       { "code": "CCA",  "name": "Certificate in Computer Applications"},
       { "code": "CCAc", "name": "Certificate in Computerized Accounting"}, 
       { "code": "CDA", "name": "Data Analysis (SPSS, Epi-info)"},
       //Masters Degree
       { "code": "MScAEE", "name": "Masters in Agricultural Extension & Education"},
       { "code": "MScCRS", "name": "Masters in Crop Science"},
       { "code": "MScANS", "name": "Masters in Animal Science"},
       { "code": "MScAEN", "name": "Masters in Agricultural Engineering"},
       { "code": "MScSOS", "name": "Masters in Soil Science"},
       { "code": "MScAEC", "name": "Masters in Agricultural Economics"},
       { "code": "MScAGM", "name": "Master of Agribusiness Management"},
       { "code": "MScFST", "name": "Masters in Food Science & Technology"},
       { "code": "MScAAE", "name": "Masters in Agricultural & Applied Economics"},
       { "code": "MScPBS", "name": "Masters in Plant Breeding and Seed Systems"},
       { "code": "MscHUN", "name": "Masters in Applied Human Nutrition"},
       { "code": "MScENR", "name": "Masters in Environment & Natural Resources"},
       { "code": "MScAGF", "name": "Masters in Agroforestry"},
       { "code": "MScF", "name": "Masters in Forestry"},
       { "code": "MAGEO", "name": "Masters in Geography"},
       { "code": "PGDD", "name": " Postgraduate diploma in Demography"},
       { "code": "PGDS", "name": "Postgraduate diploma in Statistics"},
       { "code": "MEPP", "name": "Masters in Economic Policy and Planning"},
       { "code": "MEPM", "name": "Masters in Economic Policy Management"},
       { "code": "MAE", "name": "Masters in Economics"},
       { "code": "MBA",  "name": "Masters of Business Administration"},
       { "code": "MGAE",  "name": "Masters in Gender Analysis in Economics"}, 
       { "code": "MAD", "name": "Masters in Demography"},
       { "code": "MSTA", "name": "Masters of Statistics"},
       { "code": "MPD", "name": "Masters in Population and Development"},
       { "code": "MScPRH", "name": "Masters in Population and Reproductive Health"},
       { "code": "MScQE", "name": "Masters in Quantitative Economics"},
       { "code": "MScPS", "name": "Masters in Population Studies"},
       { "code": "PGDIT", "name": "Postgraduate diploma in Information Technology"},
       { "code": "PGDCS", "name": "Postgraduate diploma in Computer Science"},
       { "code": "PGDCSE", "name": "Postgraduate diploma in Data Communication and Software Engineering"},
       { "code": "PGDIS", "name": " in Information Systems"},
       { "code": "MScCS", "name": "Masters in Computer Science"},
       { "code": "MscIT", "name": "Master of Information Technology"},
       { "code": "MScCSE", "name": "Masters in Data Communications and Software Engineering"},
       { "code": "MscISs", "name": "Masters in Information Systems"},
       { "code": "MScISc", "name": "Masters in Information Science"},
       { "code": "PGDEd", "name": "Postgraduate diploma in Education"},
       { "code": "MEdS", "name": "Masters in Science Education"},
       { "code": "MEdSSA", "name": "Masters in Social Sciences & Arts Education"},
       { "code": "MEdLL", "name": "Masters in Language & Literature Education"},
       { "code": "MEdCSt", "name": "Masters in Curriculum Studies"},
       { "code": "MEdEF",  "name": "Masters in Educational Foundation"},
       { "code": "MAEPP", "name": "Masters in Educational Policy and Planning"},
       { "code": "MEdAC", "name": "Master of Adult and Community Education"},
       { "code": "PGDCPM", "name": "Postgraduate diploma in Construction Project Management"},
       { "code": "MCE",  "name": "Masters of Engineering – Civil"}, 
       { "code": "MME",  "name": "Masters of Engineering – Mechanical"},
       { "code": "MEE", "name": "Masters of Engineering – Electrical"}, 
       { "code": "MScA", "name": "Masters of Architecture"}, 
       { "code": "MScRE", "name": "Masters in Renewable Energy"}, 
       { "code": "MA", "name": "Masters in Fine Art"},
       { "code": "MIMed", "name": "Master in Internal Medicine"},
       { "code": "MFMed", "name": "Masters in Family Medicine"},
       { "code": "MMMed", "name": "Masters in Microbiology"},
       { "code": "MOMed", "name": "Masters in Ophthalmology"},
       { "code": "MPCHMed", "name": "Masters in Paediatrics and Child Health"},
       { "Code": "MPaMed", "name": "Masters in Pathology"},
       { "code": "MPyMed", "name": "Masters in Psychiatry"},
       { "code": "MRMed", "name": "Masters in Radiology"},
       { "code": "MENTMed", "name": "Masters in Ear, Nose &Throat"},
       { "code": "MGSMed", "name": "Masters in General Surgery"},
       { "code": "MOGMed", "name": "Masters in Obstetrics & Gynaecology"},
       { "code": "MAMed", "name": "Masters in Anaesthesia"},
       { "code": "MOSMed", "name": "Masters in Orthopaedic Surgery"},
       { "code": "MscMI", "name": "Masters in Medical Illustration"},
       { "code": "MScHA", "name": "Masters in Human Anatomy"},
       { "code": "MScPH", "name": "Masters in Pharmacology"},
       { "code": "MScPy", "name": "Masters in Physiology"},
       { "code": "MScCEB", "name": "Masters in Clinical Epidemiology & Biostatistics"},
       { "code": "MScDEN", "name": "Master of Dentistry (Oral and Maxillofacial Surgery)"},
       { "code": "MScPuH", "name": "Master of Public Health"},
       { "code": "MScHSR", "name": "Master of Health Services Research"},
       { "code": "MScPuHN", "name": "Master of Public Health Nutrition"},
       { "code": "PGDGLED", "name": "Postgraduate diploma in Gender and Local Economic Development"},
       { "code": "PGDCOU", "name": "Postgraduate diploma Counselling"},
       { "code": "MAHR", "name": "Masters in Human Rights"},
       { "code": "MAAL", "name": "Masters in African Languages"},
       { "code": "MAP", "name": "Masters in Philosophy"},
       { "code": "MALF", "name": "Masters in Languages(foreign)"},
       { "code": "MAH", "name": "Masters in History"},
       { "code": "MAM", "name": "Masters in Music"},
       { "code": "MAL", "name": "Masters in Literature"},
       { "code": "MARS", "name": "Masters in Religious Studies"},
       { "code": "MAPCS", "name": "Masters in Peace and Conflict Studies"},
       { "code": "MARTS", "name": "Masters in Religious and Theological Studies(Ggaba & Kinyamasika)"},
       { "code": "MAJC", "name": "Masters in Journalism and Communication"},
       { "code": "MALI", "name": "Masters in Linguistics"},
       { "code": "MAGS", "name": "Masters in Gender Studies"},
       { "code": "MAPAM", "name": "Masters in Public Administration & Management"},
       { "code": "MASSM", "name": "Masters in Social Sector Planning & Management"},
       { "code": "MAS", "name": "Masters in Sociology"},
       { "code": "MAIRD", "name": "Masters in International Relations& Diplomatic Studies"},
       { "code": "MARD", "name": "Masters in Rural Development"},
       { "code": "MEdPSY", "name": "Masters in Educational Psychology"},
       { "code": "MOP", "name": "Master of Organisational Psychology (Evening)"},
       { "code": "MAC", "name": "Masters in Counselling"},
       { "code": "MScCP", "name": "Masters in Clinical Psychology"},
       { "code": "MScMTC", "name": "Masters in Mathematics"},
       { "code": "MScPHY",  "name": "Masters in Physics"},
       { "code": "MScCHEM", "name": "Masters in Chemistry"},
       { "code": "MScBoT", "name": "Masters in Botany"},
       { "code": "MScZoo", "name": "Masters in Zoology"},
       { "code": "MScGEOL", "name": "Masters in Geology"},
       { "code": "MScMTCM", "name": "Masters in Mathematical Modelling"},
       { "code": "MScBIOCHEM", "name": "Masters in Biochemistry"},
       { "code": "PGDLDPM", "name": "Postgraduate diploma in Livestock Development Planning & Management"},
       { "code": "MVMd", "name": "Masters of Vet. Medicine (Food Animal Health & Production)"},
       { "code": "MScMOBIO", "name": "Masters in Molecular Biology"},
       { "code": "MScVP", "name": "Masters in Vet Pathology"},
       { "code": "MVPMd", "name": "Masters of Veterinary Preventive Medicine"},
       { "code": "MWHM", "name": "Masters of Wildlife Health and Management"},
       { "code": "MScLDPM", "name": "Masters in Livestock Development Planning and Management"},
       { "code": "MBioLSM", "name": "Master of Biomedical Laboratory Sciences and Management"},
       { "code": "MWLTR", "name": "Master of Wildlife Tourism & Recreation Management"},
       { "code": "MScNPTVCM", "name": "Master of Science Natural Products Technology and Value Chain Management"},
       { "code": "MScAPPES", "name": "Master of Science in Animal Product Processing, Entrepreneurship and Safety"},
       {"code": "MLAW", "name": "Master of Laws"},
       { "code": "MAEPM", "name": "Masters in Economic Policy and Management"},
       { "code": "MBA", "name": "Master of Business Administration"},
       { "code": "MHTM", "name": "Master of Hospitality and Tourism Management"},
       { "code": "MHRM", "name": "Master of Human Resource Management"},
       { "code": "MIB", "name": "Master of International Business"},
       { "code": "MScAF", "name": "Master of Science in Accounting and Finance"},
       { "code": "MScBIM", "name": "Master of Science in Banking and Investment Management"},
       { "code": "MScMKT", "name": "Master of Science in Marketing"},
       { "code": "MScPSCM", "name": "Master of Science in Procurement and Supply Chain Management"},
       { "code": "MScENTR", "name": "Master of Science in Entreprenuership"},
       { "code": "MAFS", "name": "Master of Arts in Financial Services"},
       //Ph.Ds
       { "code": "PhDIS", "name" : "Ph.D in Information Systems"},
       { "code": "PhDCS", "name": "Ph.D in Computer Science"},
       { "code": "PhDSWE", "name": "Ph.D in Software Engineering"},
       { "code": "PhDIT", "name": "Ph.D in Information Technology"},
       { "code": "PhDISci", "name": "Ph.D in Information Science"},
       { "code": "PhDPBBIO", "name": "Ph.D in Plant Breeding and Biotechnology"},
       { "code": "IPIT", "name": "Doctor of Philosophy in Information Technology"},
       { "code": "IPBE", "name": "Doctor of Philosophy in Biomedical Engineering"},
      ]

    };

    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.getJobs = this.getJobs.bind(this);
  }

  // This checks if there is a valid user in the session.
    async componentDidMount() {

      const currentUser = this.getCurrentUser();
      if (currentUser === null) {
        this.setState({isLoadingUserToken: false});
        return;
      }
      try {
        const userToken = await this.getUserToken(currentUser);
        this.updateUserToken(userToken);
        this.getUsername()
        const accessToken = await this.getAccessToken(currentUser);
        this.updateAccessToken(accessToken);
        const userAttributes = await this.getUser(currentUser)
        this.setState({ phone: userAttributes[2].Value })
        this.getProfileInfo();
        this.getJobs();
        // console.log(this.state.username)
        // console.log(accessToken)
        // console.log(this.state.phone)
        // console.log(this.state.username)
        }

      catch(e) {
        alert(e);
      }
      this.setState({ isLoadingUserToken: false });
    }

    linkToProfileCreation() {
      this.props.history.replace("/profile/new")
    }

    setProfileInfo = (updatedProfile) => {
      this.setState({
        profile: updatedProfile,
      })
    }

    getProfileInfo = () => {
      return fetch(`${process.env.REACT_APP_PROD_SERVER}/user/${this.state.username}`, {
        method: 'GET',
        headers: {
          'x-access-token': this.state.accessToken
        }
      })
      .then((responseText) => {
        if (!responseText.ok) {
          this.linkToProfileCreation()
        }
        return responseText;
      })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            profile: response,
          });
        });
      }).catch((error) => {
        console.log('Error: ', error)
      })
    }

    getJobs = () => {
      return fetch(`${process.env.REACT_APP_PROD_SERVER}/jobs`, {
        method: 'GET',
        headers: {
          'x-access-token': this.state.accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then((responseText) => {
        var response = responseText.json();
        response.then((response) => {
          this.setState({
            jobs: response,
          });
        });
      })
    }

    getUsername() {
      const currentUser = this.getCurrentUser();
      const username = currentUser.getUsername();

      this.setState({
        username: username,
        isLoggedIn: true
      })
    }

    updateUserToken = (userToken) => {
      this.setState({
        userToken: userToken
      });
    }

    updateAccessToken = (accessToken) => {
      this.setState({
        accessToken: accessToken
      })
    }

    handleLogout = event => {
      const currentUser = this.getCurrentUser();
      if (currentUser !== null) {
        currentUser.signOut();
      }

      if (AWS.config.credentials) {
        AWS.config.credentials.clearCachedId();
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({});
      }
      this.updateUserToken(null);
      this.props.history.push("/");
    }

    getCurrentUser() {
      const userPool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
      });

      return userPool.getCurrentUser();
    }

    getUser(currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getUserAttributes(function(err, attributes) {
          if (err) {
            reject(err);
            return;
          }
          resolve(attributes);
        });
      });
    }

    getUserToken(currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getSession(function(err, session) {
          if (err) {
            reject(err);
            return;
          }
          resolve(session.getIdToken().getJwtToken());
        });
      });
    }

    getAccessToken(currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getSession(function(err, session) {
          if (err) {
            reject(err);
            return;
          }
          resolve(session.getAccessToken().getJwtToken());
        });
      });
    }



// For Login container to call this method, we need to pass a reference of this method
// We do this by passing in a couple of props to the child component of the routes that App component creates

render() {

  const childProps = {
    userToken: this.state.userToken,
    accessToken: this.state.accessToken,
    updateUserToken: this.updateUserToken,
    getUserToken: this.getUserToken,
    getAccessToken: this.getAccessToken,
    getCurrentUser: this.getCurrentUser,
    username: this.state.username,
    profile: this.state.profile,
    getProfileInfo: this.getProfileInfo,
    setProfileInfo: this.setProfileInfo,
    picture: this.state.picture,
    createNotification: this.createNotification,
    industries: this.state.industries,
    jobs: this.state.jobs,
    getJobs: this.getJobs,
    phone: this.state.phone,
    universities : this.state.universities,
    courses : this.state.courses
  };

  const spinner = document.getElementById('spinner');

  if (spinner && !spinner.hasAttribute('hidden')) {
    spinner.setAttribute('hidden', 'true');
  }


  // Since authentication checking is async, we want to hold off on rendering the apps
  // until its done - hence the first line in the return.

  return ! this.state.isLoadingUserToken &&
  (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
            {/* <Image src={logo} style={{width:25, marginRight: 5}} /> */}
              Work &amp; Rise</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.userToken
              ? [
                <NavDropdown className="ddown" key={0} title="My Profile" id="basic-nav-dropdown" href="#">
                  <RouteNavItem key={0.1} href="/profile">- View Profile</RouteNavItem>
                  <RouteNavItem key={0.2} href="/profile/edit">- Edit Profile</RouteNavItem>
                </NavDropdown>,
                <NavDropdown className="ddown" key={1} title="My Documents" id="basic-nav-dropdown" href="#">
                  <RouteNavItem key={1.1} href="/apps">- Applications</RouteNavItem>
                  <RouteNavItem key={1.2} href="/transactions">- Transactions</RouteNavItem>
                </NavDropdown>,
                <RouteNavItem key={2} href="/jobs">I'm Hiring</RouteNavItem>,
                // <RouteNavItem key={3} href="/search">Search</RouteNavItem>,
                <NavItem key={4} onClick={this.handleLogout}>Logout</NavItem>,
              ]
              : [
                <RouteNavItem key={1} href="/signup">Sign Up</RouteNavItem>,
                <RouteNavItem key={2} href="/login">Login</RouteNavItem>
              ]}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
      <Footer key={1}/>
    </div>
  );
}
}
// The App component does not have access to the route props directly since it is not rendered
// inside a Route component. To be able to use the router props, we will need to use the withRouter
// higher Order Component (HOC)
export default withRouter(App);
