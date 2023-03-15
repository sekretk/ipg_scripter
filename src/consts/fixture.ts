const USERS_LIST = `Name                          SamAccountName    DistinguishedName
----                          --------------    -----------------
Administrator                 Administrator     CN=Administrator,CN=Users,...
Guest                         Guest             CN=Guest,CN=Users,DC=IPG,D...
DefaultAccount                DefaultAccount    CN=DefaultAccount,CN=Users...
krbtgt                        krbtgt            CN=krbtgt,CN=Users,DC=IPG,...
Авдиенко Анастасия            rnd_avdienko      CN=Авдиенко Анастасия,OU=R...
Григорьева                    rnd_grigorieva    CN=Григорьева,OU=RND,DC=IP...
Аудит                         rnd_audit         CN=Аудит,OU=RND,DC=IPG,DC=...
Хуцишвилли                    rnd_hucishvilly   CN=Хуцишвилли,OU=RND,DC=IP...
Офис РНД                      rnd_office        CN=Офис РНД,OU=RND,DC=IPG,...
Белокобыльская                rnd_belokobilskay CN=Белокобыльская,OU=RND,D...
Сабич                         rnd_sabich        CN=Сабич,OU=RND,DC=IPG,DC=...
Муравьёва                     msk_muraveva      CN=Муравьёва,OU=MSK,DC=IPG...
Провидохин                    rnd_providohin    CN=Провидохин,OU=RND,DC=IP...
Скад                          rnd_sklad         CN=Скад,OU=RND,DC=IPG,DC=L...
Уртанова                      volga_urtanova    CN=Уртанова,OU=VLG,DC=IPG,...
Гужевин                       rnd_gugevin       CN=Гужевин,OU=RND,DC=IPG,D...
Васильева                     msk_vasileva      CN=Васильева,OU=MSK,DC=IPG...
Ватулина                      rnd_vatulina      CN=Ватулина,OU=MSK,DC=IPG,...
Кузьма                        krm_kuzma         CN=Кузьма,OU=CRM,DC=IPG,DC...
Чумак                         krm_chumak        CN=Чумак,OU=CRM,DC=IPG,DC=...
Ларин                         rnd_larin         CN=Ларин,OU=RND,DC=IPG,DC=...
Сергеев                       rnd_sergeev       CN=Сергеев,OU=RND,DC=IPG,D...
Горбачёв                      rnd_gorbachev     CN=Горбачёв,OU=RND,DC=IPG,...
Комаров                       rnd_komarov       CN=Комаров,OU=RND,DC=IPG,D...
Царёв                         msk_zarev         CN=Царёв,OU=MSK,DC=IPG,DC=...
Саидов                        krm_saidov        CN=Саидов,OU=CRM,DC=IPG,DC...
1С пользователь               1cadmin           CN=1С пользователь,CN=User...
Морозова                      msk_morozova      CN=Морозова,OU=MSK,DC=IPG,...
Шавкин                        msk_shavkin       CN=Шавкин,OU=MSK,DC=IPG,DC...
Марченкова                    krn_marchenkova   CN=Марченкова,OU=KRN,DC=IP...
Чепасов                       msk_chprasov      CN=Чепасов,OU=MSK,DC=IPG,D...
Чекунов                       msk_chekunov      CN=Чекунов,OU=MSK,DC=IPG,D...
Васильковский                 krm_vasilkovsky   CN=Васильковский,OU=CRM,DC...
Шипилов                       krm_shipilov      CN=Шипилов,OU=CRM,DC=IPG,D...
Муравьёв                      msk_muravev       CN=Муравьёв,OU=MSK,DC=IPG,...
Царёва                        rnd_careva        CN=Царёва,OU=RND,DC=IPG,DC...
Кособочкина                   msk_kosobochkina  CN=Кособочкина,OU=MSK,DC=I...
Лайминг                       spb_laiming       CN=Лайминг,OU=SPB,DC=IPG,D...
Морозова                      spb_morozova      CN=Морозова,OU=SPB,DC=IPG,...
Зотов                         krn_zotov         CN=Зотов,OU=KRN,DC=IPG,DC=...
Сидоров                       volga_sidorov     CN=Сидоров,OU=VLG,DC=IPG,D...
Главбух                       rnd_glavbuh       CN=Главбух,OU=RND,DC=IPG,D...
Кузнецова                     rnd_kuznezova     CN=Кузнецова,OU=RND,DC=IPG...
Гутирук                       rnd_gutiryk       CN=Гутирук,OU=RND,DC=IPG,D...
Портнова                      ptg_portnova      CN=Портнова,OU=PTG,DC=IPG,...
Гулидин                       ptg_gulidin       CN=Гулидин,OU=PTG,DC=IPG,D...
Александрова                  spb_aleksandrova  CN=Александрова,OU=SPB,DC=...
Харчев Александр Юрьевич      krm_harchev       CN=Харчев Александр Юрьеви...
Кузьмина Лилия Ринатовна      krm_kuzmina       CN=Кузьмина Лилия Ринатовн...
Улитина Оксана Сергеевна      krm_ulitina       CN=Улитина Оксана Сергеевн...
механик                       krm_mechanic      CN=механик,OU=CRM,DC=IPG,D...
Элит Аудит                    rnd_elitaudit     CN=Элит Аудит,OU=RND,DC=IP...
Рябов Андрей Александрович    krm_rybov         CN=Рябов Андрей Александро...
Жевтяк Валерий Васильевич     krn_jevkiak       CN=Жевтяк Валерий Васильев...
Седунов Иван Викторович       krn_sedunov       CN=Седунов Иван Викторович...
Ковалев Сергей                krm_kovalev       CN=Ковалев Сергей,OU=CRM,D...
Кравченко Оксана Васильевна   krm_kravchenko    CN=Кравченко Оксана Василь...
Яковлева О.В.                 krm_yakovleva     CN=Яковлева О.В.,OU=CRM,DC...
Спортзал РНД                  rnd_gym           CN=Спортзал РНД,OU=RND,DC=...
Агапова Наталья               krm_agapova       CN=Агапова Наталья,OU=CRM,...
Князев Михаил Александрович   krm_knyzev        CN=Князев Михаил Александр...
Гость                         msk_guest         CN=Гость,OU=MSK,DC=IPG,DC=...
Лащенова Анастасия Викторовна krm_lashenova     CN=Лащенова Анастасия Викт...
Крым Гость                    krm_guest         CN=Крым Гость,OU=CRM,DC=IP...
Момот Сергей Викторович       krm_momot         CN=Момот Сергей Викторович...
Ососкова Т.Ф.                 krm_ososkova      CN=Ососкова Т.Ф.,OU=CRM,DC...
Баторшина Виолетта Рашидовна  krm_batorshina    CN=Баторшина Виолетта Раши...
Плебух Лидия Анатольевна      rkm_prebuh        CN=Плебух Лидия Анатольевн...
Склад Москва                  msk_warehouse     CN=Склад Москва,OU=MSK,DC=...
Ващенко Михаил                rnd_vashenko      CN=Ващенко Михаил,OU=RND,D...
Степочкин Денис               rnd_stepochkin    CN=Степочкин Денис,OU=RND,...
Брусленко Наталья             rnd_bluslenko     CN=Брусленко Наталья,OU=RN...
Контролер                     rnd_controller    CN=Контролер,OU=RND,DC=IPG...
Мищенко Николай               krn_begun         CN=Мищенко Николай,OU=RND,...
Мищенко Николай               rnd_mishenko      CN=Мищенко Николай,CN=User...
Планировщик                   krm_scheduler     CN=Планировщик,OU=CRM,DC=I...
test testovich                test              CN=test testovich,CN=Users...
Эмшанова Елена Васильевна     krm_eshmanova     CN=Эмшанова Елена Васильев...
Нетолчина Ольга Юрьевна       krm_netolchina    CN=Нетолчина Ольга Юрьевна...
Жабкин А.И.                   volga_jabkin      CN=Жабкин А.И.,OU=VLG,DC=I...
Зобов С.А.                    volga_zobov       CN=Зобов С.А.,OU=VLG,DC=IP...
`;

export const ALL_GROUPS_OUTPUT = `Name                                    SID
----                                    ---
Administrators                          S-1-5-32-544
Users                                   S-1-5-32-545
Guests                                  S-1-5-32-546
Print Operators                         S-1-5-32-550
Backup Operators                        S-1-5-32-551
Replicator                              S-1-5-32-552
Remote Desktop Users                    S-1-5-32-555
Network Configuration Operators         S-1-5-32-556
Performance Monitor Users               S-1-5-32-558
Performance Log Users                   S-1-5-32-559
Distributed COM Users                   S-1-5-32-562
IIS_IUSRS                               S-1-5-32-568
Cryptographic Operators                 S-1-5-32-569
Event Log Readers                       S-1-5-32-573
Certificate Service DCOM Access         S-1-5-32-574
RDS Remote Access Servers               S-1-5-32-575
RDS Endpoint Servers                    S-1-5-32-576
RDS Management Servers                  S-1-5-32-577
Hyper-V Administrators                  S-1-5-32-578
Access Control Assistance Operators     S-1-5-32-579
Remote Management Users                 S-1-5-32-580
System Managed Accounts Group           S-1-5-32-581
Storage Replica Administrators          S-1-5-32-582
Domain Computers                        S-1-5-21-1403180944-1677745273-223...
Domain Controllers                      S-1-5-21-1403180944-1677745273-223...
Schema Admins                           S-1-5-21-1403180944-1677745273-223...
Enterprise Admins                       S-1-5-21-1403180944-1677745273-223...
Cert Publishers                         S-1-5-21-1403180944-1677745273-223...
Domain Admins                           S-1-5-21-1403180944-1677745273-223...
Domain Users                            S-1-5-21-1403180944-1677745273-223...
Domain Guests                           S-1-5-21-1403180944-1677745273-223...
Group Policy Creator Owners             S-1-5-21-1403180944-1677745273-223...
RAS and IAS Servers                     S-1-5-21-1403180944-1677745273-223...
Server Operators                        S-1-5-32-549
Account Operators                       S-1-5-32-548
Pre-Windows 2000 Compatible Access      S-1-5-32-554
Incoming Forest Trust Builders          S-1-5-32-557
Windows Authorization Access Group      S-1-5-32-560
Terminal Server License Servers         S-1-5-32-561
Allowed RODC Password Replication Group S-1-5-21-1403180944-1677745273-223...
Denied RODC Password Replication Group  S-1-5-21-1403180944-1677745273-223...
Read-only Domain Controllers            S-1-5-21-1403180944-1677745273-223...
Enterprise Read-only Domain Controllers S-1-5-21-1403180944-1677745273-223...
Cloneable Domain Controllers            S-1-5-21-1403180944-1677745273-223...
Protected Users                         S-1-5-21-1403180944-1677745273-223...
Key Admins                              S-1-5-21-1403180944-1677745273-223...
Enterprise Key Admins                   S-1-5-21-1403180944-1677745273-223...
DnsAdmins                               S-1-5-21-1403180944-1677745273-223...
DnsUpdateProxy                          S-1-5-21-1403180944-1677745273-223...
RND                                     S-1-5-21-1403180944-1677745273-223...
_ALL                                    S-1-5-21-1403180944-1677745273-223...
1C                                      S-1-5-21-1403180944-1677745273-223...
IPG_Management                          S-1-5-21-1403180944-1677745273-223...
Controller_Temp130223Sam                S-1-5-21-1403180944-1677745273-223...
IPG_Production                          S-1-5-21-1403180944-1677745273-223...
IPG_Controller                          S-1-5-21-1403180944-1677745273-223...
IPG_Management_M-A-M                    S-1-5-21-1403180944-1677745273-223...
IPG_Management_M-A-K                    S-1-5-21-1403180944-1677745273-223...
IPG_Documentation                       S-1-5-21-1403180944-1677745273-223...
IPG_Buhgalteria                         S-1-5-21-1403180944-1677745273-223...
`;

export const USER_GROUPS_OUTPUT = `name                 SID
----                 ---
Domain Users         S-1-5-21-1403180944-1677745273-2235910166-513
IPG_Management_M-A-M S-1-5-21-1403180944-1677745273-2235910166-1196
IPG_Buhgalteria      S-1-5-21-1403180944-1677745273-2235910166-1601`;

