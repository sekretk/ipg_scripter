import { COMMANDS } from './commands';

export const USERS_LIST_01 = `SamAccountName    DistinguishedName                                       Enabled lastLogon
--------------    -----------------                                       ------- ---------
Administrator     CN=Administrator,CN=Users,DC=IPG,DC=LOCAL                  True 2023-03-21
Guest             CN=Guest,CN=Users,DC=IPG,DC=LOCAL                         False 1601-01-01
DefaultAccount    CN=DefaultAccount,CN=Users,DC=IPG,DC=LOCAL                False 1601-01-01
krbtgt            CN=krbtgt,CN=Users,DC=IPG,DC=LOCAL                        False 1601-01-01
rnd_avdienko      CN=Авдиенко Анастасия,OU=RND,DC=IPG,DC=LOCAL               True 2023-03-21
rnd_grigorieva    CN=Григорьева,OU=RND,DC=IPG,DC=LOCAL                       True 2023-03-21
rnd_audit         CN=Аудит,OU=RND,DC=IPG,DC=LOCAL                           False 2023-03-14
rnd_hucishvilly   CN=Хуцишвилли,OU=RND,DC=IPG,DC=LOCAL                       True 2023-03-21
rnd_office        CN=Офис РНД,OU=RND,DC=IPG,DC=LOCAL                         True 2023-03-21
rnd_belokobilskay CN=Белокобыльская,OU=RND,DC=IPG,DC=LOCAL                   True 2020-01-31
rnd_sabich        CN=Сабич,OU=RND,DC=IPG,DC=LOCAL                            True 2023-03-21
msk_muraveva      CN=Муравьёва,OU=MSK,DC=IPG,DC=LOCAL                        True 2023-03-21
rnd_providohin    CN=Провидохин,OU=RND,DC=IPG,DC=LOCAL                       True 2023-03-21
rnd_sklad         CN=Скад,OU=RND,DC=IPG,DC=LOCAL                             True 2023-03-21
volga_urtanova    CN=Уртанова,OU=VLG,DC=IPG,DC=LOCAL                         True 2023-03-21
rnd_gugevin       CN=Гужевин,OU=RND,DC=IPG,DC=LOCAL                          True 2023-03-21
msk_vasileva      CN=Васильева,OU=MSK,DC=IPG,DC=LOCAL                        True 2023-03-21
rnd_vatulina      CN=Ватулина,OU=MSK,DC=IPG,DC=LOCAL                         True 2023-03-21
krm_kuzma         CN=Кузьма,OU=CRM,DC=IPG,DC=LOCAL                           True 2022-04-15
krm_chumak        CN=Чумак,OU=CRM,DC=IPG,DC=LOCAL                            True 2023-03-21
rnd_larin         CN=Ларин,OU=RND,DC=IPG,DC=LOCAL                            True 2023-03-21
rnd_sergeev       CN=Сергеев,OU=RND,DC=IPG,DC=LOCAL                          True 2023-03-21
rnd_gorbachev     CN=Горбачёв,OU=RND,DC=IPG,DC=LOCAL                         True 2023-03-21
rnd_komarov       CN=Комаров,OU=RND,DC=IPG,DC=LOCAL                          True 2023-03-21
msk_zarev         CN=Царёв,OU=MSK,DC=IPG,DC=LOCAL                            True 2023-03-21
krm_saidov        CN=Саидов,OU=CRM,DC=IPG,DC=LOCAL                           True 2020-12-28
1cadmin           CN=1С пользователь,CN=Users,DC=IPG,DC=LOCAL                True 2023-03-21
msk_morozova      CN=Морозова,OU=MSK,DC=IPG,DC=LOCAL                         True 2023-03-21
msk_shavkin       CN=Шавкин,OU=MSK,DC=IPG,DC=LOCAL                           True 2023-03-21
krn_marchenkova   CN=Марченкова,OU=KRN,DC=IPG,DC=LOCAL                       True 2023-03-21
msk_chprasov      CN=Чепасов,OU=MSK,DC=IPG,DC=LOCAL                          True 2020-12-14
msk_chekunov      CN=Чекунов,OU=MSK,DC=IPG,DC=LOCAL                          True 2023-03-21
krm_vasilkovsky   CN=Васильковский,OU=CRM,DC=IPG,DC=LOCAL                   False 2021-05-25
krm_shipilov      CN=Шипилов,OU=CRM,DC=IPG,DC=LOCAL                          True 2019-12-18
msk_muravev       CN=Муравьёв,OU=MSK,DC=IPG,DC=LOCAL                         True 2023-03-20
rnd_careva        CN=Царёва,OU=RND,DC=IPG,DC=LOCAL                           True 2023-03-21
msk_kosobochkina  CN=Кособочкина,OU=MSK,DC=IPG,DC=LOCAL                      True 1601-01-01
spb_laiming       CN=Лайминг,OU=SPB,DC=IPG,DC=LOCAL                          True 2023-03-21
spb_morozova      CN=Морозова,OU=SPB,DC=IPG,DC=LOCAL                         True 2023-03-21
krn_zotov         CN=Зотов,OU=KRN,DC=IPG,DC=LOCAL                            True 2023-03-18
volga_sidorov     CN=Сидоров,OU=VLG,DC=IPG,DC=LOCAL                          True 2023-02-14
rnd_glavbuh       CN=Главбух,OU=RND,DC=IPG,DC=LOCAL                         False 2023-03-10
rnd_kuznezova     CN=Кузнецова,OU=RND,DC=IPG,DC=LOCAL                        True 2023-02-10
rnd_gutiryk       CN=Гутирук,OU=RND,DC=IPG,DC=LOCAL                          True 2020-05-15
ptg_portnova      CN=Портнова,OU=PTG,DC=IPG,DC=LOCAL                         True 2023-03-21
ptg_gulidin       CN=Гулидин,OU=PTG,DC=IPG,DC=LOCAL                          True 2023-03-20
spb_aleksandrova  CN=Александрова,OU=SPB,DC=IPG,DC=LOCAL                     True 2023-03-21
krm_harchev       CN=Харчев Александр Юрьевич,OU=CRM,DC=IPG,DC=LOCAL         True 2020-03-16
krm_kuzmina       CN=Кузьмина Лилия Ринатовна,OU=CRM,DC=IPG,DC=LOCAL        False 2021-01-28
krm_ulitina       CN=Улитина Оксана Сергеевна,OU=CRM,DC=IPG,DC=LOCAL         True 2023-03-15
krm_mechanic      CN=механик,OU=CRM,DC=IPG,DC=LOCAL                          True 2020-03-24
rnd_elitaudit     CN=Элит Аудит,OU=RND,DC=IPG,DC=LOCAL                      False 2023-03-13
krm_rybov         CN=Рябов Андрей Александрович,OU=CRM,DC=IPG,DC=LOCAL       True 2023-03-16
krn_jevkiak       CN=Жевтяк Валерий Васильевич,OU=KRN,DC=IPG,DC=LOCAL        True 2023-03-21
krn_sedunov       CN=Седунов Иван Викторович,OU=KRN,DC=IPG,DC=LOCAL          True 2023-03-21
krm_kovalev       CN=Ковалев Сергей,OU=CRM,DC=IPG,DC=LOCAL                   True 2023-03-21
krm_kravchenko    CN=Кравченко Оксана Васильевна,OU=CRM,DC=IPG,DC=LOCAL      True 2023-03-21
krm_yakovleva     CN=Яковлева О.В.,OU=CRM,DC=IPG,DC=LOCAL                    True 1601-01-01
rnd_gym           CN=Спортзал РНД,OU=RND,DC=IPG,DC=LOCAL                     True 2021-05-28
krm_agapova       CN=Агапова Наталья,OU=CRM,DC=IPG,DC=LOCAL                  True 2023-03-21
krm_knyzev        CN=Князев Михаил Александрович,OU=CRM,DC=IPG,DC=LOCAL     False 2022-12-30
msk_guest         CN=Гость,OU=MSK,DC=IPG,DC=LOCAL                            True 2021-05-30
krm_lashenova     CN=Лащенова Анастасия Викторовна,OU=CRM,DC=IPG,DC=LOCAL    True 2023-03-21
krm_guest         CN=Крым Гость,OU=CRM,DC=IPG,DC=LOCAL                       True 2023-02-08
krm_momot         CN=Момот Сергей Викторович,OU=KRN,DC=IPG,DC=LOCAL          True 2023-03-17
krm_ososkova      CN=Ососкова Т.Ф.,OU=CRM,DC=IPG,DC=LOCAL                    True 2023-03-21
krm_batorshina    CN=Баторшина Виолетта Рашидовна,OU=CRM,DC=IPG,DC=LOCAL     True 2023-02-14
rkm_prebuh        CN=Плебух Лидия Анатольевна,OU=CRM,DC=IPG,DC=LOCAL         True 2023-03-21
msk_warehouse     CN=Склад Москва,OU=MSK,DC=IPG,DC=LOCAL                     True 2023-03-14
rnd_vashenko      CN=Ващенко Михаил,OU=RND,DC=IPG,DC=LOCAL                   True 2023-03-21
rnd_stepochkin    CN=Степочкин Денис,OU=RND,DC=IPG,DC=LOCAL                  True 2023-03-21
rnd_bluslenko     CN=Брусленко Наталья,OU=RND,DC=IPG,DC=LOCAL                True 2023-03-21
rnd_controller    CN=Контролер,OU=RND,DC=IPG,DC=LOCAL                        True 2023-03-18
krn_begun         CN=Мищенко Николай,OU=RND,DC=IPG,DC=LOCAL                  True 1601-01-01
rnd_mishenko      CN=Мищенко Николай,CN=Users,DC=IPG,DC=LOCAL                True 2023-03-21
krm_scheduler     CN=Планировщик,OU=CRM,DC=IPG,DC=LOCAL                      True 2023-03-21
test              CN=test testovich,CN=Users,DC=IPG,DC=LOCAL                 True 2023-03-21
krm_eshmanova     CN=Эмшанова Елена Васильевна,OU=CRM,DC=IPG,DC=LOCAL        True 2023-03-21
krm_netolchina    CN=Нетолчина Ольга Юрьевна,OU=CRM,DC=IPG,DC=LOCAL          True 2023-03-21
volga_jabkin      CN=Жабкин А.И.,OU=VLG,DC=IPG,DC=LOCAL                      True 1601-01-01
volga_zobov       CN=Зобов С.А.,OU=VLG,DC=IPG,DC=LOCAL                       True 1601-01-01

`;

export const GROUPS_OUTPUT_01 = `Name                                    SID
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

export const GROUPS_OUTPUT_02 = `name                 SID
----                 ---
Domain Users         S-1-5-21-1403180944-1677745273-2235910166-513
IPG_Management_M-A-M S-1-5-21-1403180944-1677745273-2235910166-1196
IPG_Buhgalteria      S-1-5-21-1403180944-1677745273-2235910166-1601`;

export const COMMAND_MOCKS: Record<
  (typeof COMMANDS)[keyof typeof COMMANDS],
  string
> = {
  [COMMANDS.GET_ALL_USER]: USERS_LIST_01,
  [COMMANDS.ADD_USER_TO_GROUP]: '',
  [COMMANDS.DISABLE_USER]: '',
  [COMMANDS.GET_ALL_GROUPS]: GROUPS_OUTPUT_01,
  [COMMANDS.GET_USER_GROUPS]: GROUPS_OUTPUT_02,
  [COMMANDS.REMOVE_USER_FROM_GROUP]: '',
  [COMMANDS.HELLO]: 'mock hello',
};
