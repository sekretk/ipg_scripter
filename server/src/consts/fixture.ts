import { User } from '../dto';
import {
  activateUser,
  changePassword,
  COMMANDS,
  deactivateUser,
  getUserDetailsCommand,
  getUserGroups,
  moveUserToGroup,
  removeUserFromGroup,
} from './commands';

export const USERS_LIST_01 = `Administrator|CN=Administrator,CN=Users,DC=IPG,DC=LOCAL|True|2023-03-24
Guest|CN=Guest,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01
DefaultAccount|CN=DefaultAccount,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01
krbtgt|CN=krbtgt,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01
rnd_avdienko|CN=Авдиенко Анастасия,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_grigorieva|CN=Григорьева,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_audit|CN=Аудит,OU=RND,DC=IPG,DC=LOCAL|False|2023-03-14
rnd_hucishvilly|CN=Хуцишвилли,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_office|CN=Офис РНД,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-23
rnd_belokobilskay|CN=Белокобыльская,OU=RND,DC=IPG,DC=LOCAL|False|2020-01-31
rnd_sabich|CN=Сабич,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
msk_muraveva|CN=Муравьёва,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-23
rnd_providohin|CN=Провидохин,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_sklad|CN=Скад,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-23
volga_urtanova|CN=Уртанова,OU=VLG,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_gugevin|CN=Гужевин,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
msk_vasileva|CN=Васильева,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_vatulina|CN=Ватулина,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
krm_kuzma|CN=Кузьма,OU=CRM,DC=IPG,DC=LOCAL|False|2022-04-15
krm_chumak|CN=Чумак,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_larin|CN=Ларин,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_sergeev|CN=Сергеев,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_gorbachev|CN=Горбачёв,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_komarov|CN=Комаров,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
msk_zarev|CN=Царёв,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
krm_saidov|CN=Саидов,OU=CRM,DC=IPG,DC=LOCAL|False|2020-12-28
1cadmin|CN=1С пользователь,CN=Users,DC=IPG,DC=LOCAL|True|2023-03-23
msk_morozova|CN=Морозова,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
msk_shavkin|CN=Шавкин,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
krn_marchenkova|CN=Марченкова,OU=KRN,DC=IPG,DC=LOCAL|True|2023-03-21
msk_chprasov|CN=Чепасов,OU=MSK,DC=IPG,DC=LOCAL|False|2020-12-14
msk_chekunov|CN=Чекунов,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
krm_vasilkovsky|CN=Васильковский,OU=CRM,DC=IPG,DC=LOCAL|False|2021-05-25
krm_shipilov|CN=Шипилов,OU=CRM,DC=IPG,DC=LOCAL|False|2019-12-18
msk_muravev|CN=Муравьёв,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_careva|CN=Царёва,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
msk_kosobochkina|CN=Кособочкина,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01
spb_laiming|CN=Лайминг,OU=SPB,DC=IPG,DC=LOCAL|True|2023-03-24
spb_morozova|CN=Морозова,OU=SPB,DC=IPG,DC=LOCAL|True|2023-03-23
krn_zotov|CN=Зотов,OU=KRN,DC=IPG,DC=LOCAL|True|2023-03-18
volga_sidorov|CN=Сидоров,OU=VLG,DC=IPG,DC=LOCAL|True|2023-02-14
rnd_glavbuh|CN=Главбух,OU=RND,DC=IPG,DC=LOCAL|False|2023-03-10
rnd_kuznezova|CN=Кузнецова,OU=RND,DC=IPG,DC=LOCAL|True|2023-02-10
rnd_gutiryk|CN=Гутирук,OU=RND,DC=IPG,DC=LOCAL|False|2020-05-15
ptg_portnova|CN=Портнова,OU=PTG,DC=IPG,DC=LOCAL|True|2023-03-24
ptg_gulidin|CN=Гулидин,OU=PTG,DC=IPG,DC=LOCAL|True|2023-03-24
spb_aleksandrova|CN=Александрова,OU=SPB,DC=IPG,DC=LOCAL|True|2023-03-24
krm_harchev|CN=Харчев Александр Юрьевич,OU=CRM,DC=IPG,DC=LOCAL|True|2020-03-16
krm_kuzmina|CN=Кузьмина Лилия Ринатовна,OU=CRM,DC=IPG,DC=LOCAL|False|2021-01-28
krm_ulitina|CN=Улитина Оксана Сергеевна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-22
krm_mechanic|CN=механик,OU=CRM,DC=IPG,DC=LOCAL|False|2020-03-24
rnd_elitaudit|CN=Элит Аудит,OU=RND,DC=IPG,DC=LOCAL|False|2023-03-13
krm_rybov|CN=Рябов Андрей Александрович,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-16
krn_jevkiak|CN=Жевтяк Валерий Васильевич,OU=KRN,DC=IPG,DC=LOCAL|True|2023-03-24
krn_sedunov|CN=Седунов Иван Викторович,OU=KRN,DC=IPG,DC=LOCAL|True|2023-03-24
krm_kovalev|CN=Ковалев Сергей,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_kravchenko|CN=Кравченко Оксана Васильевна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_yakovleva|CN=Яковлева О.В.,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01
rnd_gym|CN=Спортзал РНД,OU=RND,DC=IPG,DC=LOCAL|True|2021-05-28
krm_agapova|CN=Агапова Наталья,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_knyzev|CN=Князев Михаил Александрович,OU=CRM,DC=IPG,DC=LOCAL|False|2022-12-30
msk_guest|CN=Гость,OU=MSK,DC=IPG,DC=LOCAL|False|2021-05-30
krm_lashenova|CN=Лащенова Анастасия Викторовна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-23krm_guest|CN=Крым Гость,OU=CRM,DC=IPG,DC=LOCAL|True|2023-02-08
krm_momot|CN=Момот Сергей Викторович,OU=KRN,DC=IPG,DC=LOCAL|True|2023-03-23
krm_ososkova|CN=Ососкова Т.Ф.,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_batorshina|CN=Баторшина Виолетта Рашидовна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-02-14rkm_prebuh|CN=Плебух Лидия Анатольевна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-21
msk_warehouse|CN=Склад Москва,OU=MSK,DC=IPG,DC=LOCAL|True|2023-03-22
rnd_vashenko|CN=Ващенко Михаил,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_stepochkin|CN=Степочкин Денис,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-21
rnd_bluslenko|CN=Брусленко Наталья,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
rnd_controller|CN=Контролер,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24
krn_begun|CN=Мищенко Николай,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01
rnd_mishenko|CN=Мищенко Николай,CN=Users,DC=IPG,DC=LOCAL|True|2023-03-24
krm_scheduler|CN=Планировщик,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_eshmanova|CN=Эмшанова Елена Васильевна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
krm_netolchina|CN=Нетолчина Ольга Юрьевна,OU=CRM,DC=IPG,DC=LOCAL|True|2023-03-24
volga_jabkin|CN=Жабкин А.И.,OU=VLG,DC=IPG,DC=LOCAL|True|1601-01-01
volga_zobov|CN=Зобов С.А.,OU=VLG,DC=IPG,DC=LOCAL|True|1601-01-01`;

export const GROUPS_OUTPUT_01 = `
Name
----
Administrators
Users
Guests
Print Operators
Backup Operators
Replicator
Remote Desktop Users
Network Configuration Operators
Performance Monitor Users
Performance Log Users
Distributed COM Users
IIS_IUSRS
Cryptographic Operators
Event Log Readers
Certificate Service DCOM Access
RDS Remote Access Servers
RDS Endpoint Servers
RDS Management Servers
Hyper-V Administrators
Access Control Assistance Operators
Remote Management Users
System Managed Accounts Group
Storage Replica Administrators
Domain Computers
Domain Controllers
Schema Admins
Enterprise Admins
Cert Publishers
Domain Admins
Domain Users
Domain Guests
Group Policy Creator Owners
RAS and IAS Servers
Server Operators
Account Operators
Pre-Windows 2000 Compatible Access
Incoming Forest Trust Builders
Windows Authorization Access Group
Terminal Server License Servers
Allowed RODC Password Replication Group
Denied RODC Password Replication Group
Read-only Domain Controllers
Enterprise Read-only Domain Controllers
Cloneable Domain Controllers
Protected Users
Key Admins
Enterprise Key Admins
DnsAdmins
DnsUpdateProxy
RND
_ALL
1C
IPG_Management
Controller_Temp130223Sam
IPG_Production
IPG_Controller
IPG_Management_M-A-M
IPG_Management_M-A-K
IPG_Documentation
IPG_Buhgalteria
IPG_АЙПИДЖИ-ЮГ
IPG_ВОЛГОГРАД
IPG_КРАСНОДАР_АДЫГЕЯ
IPG_МОСКВА
IPG_ПЯТИГОРСК
IPG_РОСТОВ
IPG_САНКТ-ПЕТЕРБУРГ
IPG_СЕВАСТОПОЛЬ
IPG_ОБЩАЯ
IPG_СНАБЖЕНИЕ
IPG_ИП-ЛИИ
IPG_OLD
IPG_ТАБЕЛИ
`;

export const GROUPS_OUTPUT_02 = `name                 SID
----                 ---
Domain Users         S-1-5-21-1403180944-1677745273-2235910166-513
IPG_Management_M-A-M S-1-5-21-1403180944-1677745273-2235910166-1196
IPG_Buhgalteria      S-1-5-21-1403180944-1677745273-2235910166-1601`;

export const ONE_USER_RESP = `rnd_avdienko|CN=Авдиенко Анастасия,OU=RND,DC=IPG,DC=LOCAL|True|2023-03-24`;

export const SNAPSHOT_01 = `Administrator|CN=Administrator,CN=Users,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;Administrators;Schema Admins;Enterprise Admins;Domain Admins;Group Policy Creator Owners
Guest|CN=Guest,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01|Domain Guests;Guests
DefaultAccount|CN=DefaultAccount,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01|Domain Users;System Managed Accounts Group
krbtgt|CN=krbtgt,CN=Users,DC=IPG,DC=LOCAL|False|1601-01-01|Domain Users;Denied RODC Password Replication Group
rnd_avdienko|CN=Авдиенко Анастасия,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Management_M-A-M;IPG_Management_M-A-K;IPG_Buhgalteria;IPG_АЙПИДЖИ-ЮГ;IPG_ВОЛГОГРАД;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_МОСКВА;IPG_ПЯТИГОРСК;IPG_РОСТОВ;IPG_САНКТ-ПЕТЕРБУРГ;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ;IPG_ИП-ЛИИ
rnd_grigorieva|CN=Григорьева,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_hucishvilly|CN=Хуцишвилли,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_office|CN=Офис РНД,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_sabich|CN=Сабич,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
msk_muraveva|CN=Муравьёва,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Management;IPG_Production;IPG_Controller;IPG_Management_M-A-M;IPG_Management_M-A-K;IPG_Documentation;IPG_Buhgalteria;IPG_АЙПИДЖИ-ЮГ;IPG_ВОЛГОГРАД;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_МОСКВА;IPG_ПЯТИГОРСК;IPG_РОСТОВ;IPG_САНКТ-ПЕТЕРБУРГ;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ;IPG_ИП-ЛИИ;IPG_ТАБЕЛИ
rnd_providohin|CN=Провидохин,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_sklad|CN=Скад,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
volga_urtanova|CN=Уртанова,OU=VLG,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_ВОЛГОГРАД;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
rnd_gugevin|CN=Гужевин,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
msk_vasileva|CN=Васильева,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Buhgalteria;IPG_МОСКВА;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
rnd_vatulina|CN=Ватулина,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
krm_chumak|CN=Чумак,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ
rnd_larin|CN=Ларин,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
rnd_sergeev|CN=Сергеев,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_gorbachev|CN=Горбачёв,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Documentation;IPG_РОСТОВ;IPG_ОБЩАЯ;IPG_OLD;IPG_ТАБЕЛИ
rnd_komarov|CN=Комаров,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
msk_zarev|CN=Царёв,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;Controller_Temp130223Sam;IPG_Production;IPG_Controller;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
1cadmin|CN=1С пользователь,CN=Users,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;1C
msk_morozova|CN=Морозова,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
msk_shavkin|CN=Шавкин,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Management;Controller_Temp130223Sam;IPG_Production;IPG_Controller;IPG_Management_M-A-M;IPG_Management_M-A-K;IPG_Documentation;IPG_Buhgalteria;IPG_АЙПИДЖИ-ЮГ;IPG_ВОЛГОГРАД;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_МОСКВА;IPG_ПЯТИГОРСК;IPG_РОСТОВ;IPG_САНКТ-ПЕТЕРБУРГ;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ;IPG_ИП-ЛИИ
msk_chekunov|CN=Чекунов,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_МОСКВА;IPG_ОБЩАЯ
msk_muravev|CN=Муравьёв,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;Controller_Temp130223Sam;IPG_Production;IPG_Controller;IPG_Management_M-A-M;IPG_Management_M-A-K;IPG_Documentation;IPG_Buhgalteria;IPG_АЙПИДЖИ-ЮГ;IPG_ВОЛГОГРАД;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_МОСКВА;IPG_ПЯТИГОРСК;IPG_РОСТОВ;IPG_САНКТ-ПЕТЕРБУРГ;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ;IPG_ИП-ЛИИ;IPG_OLD;IPG_ТАБЕЛИ
rnd_careva|CN=Царёва,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain
Users;Controller_Temp130223Sam;IPG_Production;IPG_Controller
msk_kosobochkina|CN=Кособочкина,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
spb_laiming|CN=Лайминг,OU=SPB,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_САНКТ-ПЕТЕРБУРГ;IPG_ОБЩАЯ
spb_morozova|CN=Морозова,OU=SPB,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_САНКТ-ПЕТЕРБУРГ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
krn_zotov|CN=Зотов,OU=KRN,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_ОБЩАЯ
volga_sidorov|CN=Сидоров,OU=VLG,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
ptg_portnova|CN=Портнова,OU=PTG,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
ptg_gulidin|CN=Гулидин,OU=PTG,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
spb_aleksandrova|CN=Александрова,OU=SPB,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_САНКТ-ПЕТЕРБУРГ;IPG_ОБЩАЯ
krm_rybov|CN=Рябов Андрей Александрович,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;Controller_Temp130223Sam;IPG_Production;IPG_Controller
krn_jevkiak|CN=Жевтяк Валерий Васильевич,OU=KRN,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_ОБЩАЯ
krn_sedunov|CN=Седунов Иван Викторович,OU=KRN,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_ОБЩАЯ
krm_kovalev|CN=Ковалев Сергей,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ
krm_kravchenko|CN=Кравченко Оксана Васильевна,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Management;IPG_Management_M-A-K;IPG_ВОЛГОГРАД;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_РОСТОВ;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ;IPG_СНАБЖЕНИЕ
krm_yakovleva|CN=Яковлева О.В.,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
krm_agapova|CN=Агапова Наталья,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ
krm_lashenova|CN=Лащенова Анастасия Викторовна,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ
krm_guest|CN=Крым Гость,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
krm_momot|CN=Момот Сергей Викторович,OU=KRN,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_КРАСНОДАР_АДЫГЕЯ;IPG_ОБЩАЯ
krm_ososkova|CN=Ососкова Т.Ф.,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_СЕВАСТОПОЛЬ;IPG_ОБЩАЯ
rkm_prebuh|CN=Плебух Лидия Анатольевна,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Buhgalteria;IPG_ОБЩАЯ
msk_warehouse|CN=Склад Москва,OU=MSK,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
rnd_stepochkin|CN=Степочкин Денис,OU=RND,DC=IPG,DC=LOCAL|False|1601-01-01|Domain Users;RND;IPG_РОСТОВ;IPG_ОБЩАЯ
rnd_bluslenko|CN=Брусленко Наталья,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;RND;IPG_РОСТОВ
rnd_controller|CN=Контролер,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Controller
rnd_mishenko|CN=Мищенко Николай,OU=RND,DC=IPG,DC=LOCAL|False|1601-01-01|Domain Users;IPG_РОСТОВ;IPG_ОБЩАЯ
krm_scheduler|CN=Планировщик,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;Controller_Temp130223Sam;IPG_Production;IPG_Controller
krm_eshmanova|CN=Эмшанова Елена Васильевна,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Buhgalteria;IPG_ОБЩАЯ
krm_netolchina|CN=Нетолчина Ольга Юрьевна,OU=CRM,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_Production;IPG_Buhgalteria
volga_zobov|CN=Зобов С.А.,OU=VLG,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users
ksekret|CN=ksekret,OU=RND,DC=IPG,DC=LOCAL|True|1601-01-01|Domain Users;IPG_OLD`;

export const COMMAND_MOCKS: Record<
  (typeof COMMANDS)[keyof typeof COMMANDS],
  string
> = {
  [COMMANDS.GET_ALL_USER]: USERS_LIST_01,
  [COMMANDS.GET_ALL_GROUPS]: GROUPS_OUTPUT_01,
  [COMMANDS.SNAPSHOT]: SNAPSHOT_01,
  [getUserDetailsCommand('rnd_avdienko')]: ONE_USER_RESP,
  [getUserGroups('rnd_avdienko')]: GROUPS_OUTPUT_02,
  [activateUser('rnd_avdienko')]: '',
  [deactivateUser('rnd_avdienko')]: '',
  [moveUserToGroup('rnd_avdienko', 'IPG_Buhgalteria')]: '',
  [removeUserFromGroup('rnd_avdienko', 'IPG_Buhgalteria')]: '',
};

export const FALLBACK_USER: User = {
  disabled: false,
  lastLogin: '--',
  name: 'unknown',
};
