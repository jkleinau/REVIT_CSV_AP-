import csv
from fileinput import filename
from logging import root
import math
from tkinter import ttk
from tkinter import filedialog as fd
from tkinter import messagebox as mb
import tkinter
from turtle import title


def get_row(ebene, title, wand_id, gruppe='', ap_wand_id='', artikelnummer='', me='Stück', menge=1, profillänge='', fläche='', einkauf='1', lager='1', fertigung='0', auftrag='0',  länge='', breite='', bsu_id='', kleinteilbez=''):
    return {
        'APPLUS EBENE': ebene,
        'APPLUS BEZEICHNUNG': title,
        'APPLUS ARTIKELNUMMER': artikelnummer,
        'APPLUS MENGE': menge,
        'APPLUS MENGENEINHEIT': me,
        'APPLUS ARTIKELGRUPPE': gruppe,
        'APPLUS PROFILLÄNGE': profillänge,
        'APPLUS FLÄCHE': fläche,
        'APPLUS STANDARDPROFILLÄNGE': '',
        'APPLUS STANDARDFLÄCHE': '',
        'APPLUS EINKAUF': einkauf,
        'APPLUS LAGER': lager,
        'APPLUS FERTIGUNG': fertigung,
        'APPLUS AUFTRAG': auftrag,
        'APPLUS LÄNGE': länge,
        'APPLUS BREITE': breite,
        'APPLUS WAND ID': ap_wand_id,
        'APPLUS BSU ID': bsu_id,
        'APPLUS KLEINTEILBEZEICHNUNG': kleinteilbez,
        'Wand ID': wand_id,
    }


def select_file():
    filetypes = (
        ('csv files', '*.csv'),
        ('All files', '*.*')
    )
    global filepath
    filepath = fd.askopenfilename(
        title='Open a file',
        initialdir='/',
        filetypes=filetypes)


def plattesml(data, idx):
    flaeche = float(data[idx]['APPLUS FLÄCHE'].replace(',', '.'))
    match flaeche:
        case flaeche if flaeche <= 0.5:
            data[idx]['APPLUS ARTIKELGRUPPE'] = 'PlatteS'
        case flaeche if flaeche < 1.5:
            data[idx]['APPLUS ARTIKELGRUPPE'] = 'PlatteM'
        case flaeche if flaeche > 1.5:
            data[idx]['APPLUS ARTIKELGRUPPE'] = 'PlatteL'


def add_leading_zeros(data, idx, column):
    data[idx][column] = data[idx][column].zfill(4)


def trim_str(data, idx, column):
    val = float(data[idx][column].replace(',', '.'))
    res = ""
    if val <= 10.0:
        res = "{:.3f}".format(val)
    elif val <= 100.0:
        res = "{:.2f}".format(val)
    elif val <= 1000.0:
        res = "{:.1f}".format(val)
    else:
        res = "{:.0f}".format(val)
    data[idx][column] = res


def extend_description(data, idx, column):
    data[idx][column] = data[idx][column] + \
        " " + data[idx]['APPLUS FLÄCHE'] + " M2"


def cut(data, idx, column):
    tmp = data[idx][column]
    data[idx][column] = ''
    return tmp


def fertigung_auftrag(data, idx):
    data[idx]['APPLUS EINKAUF'] = '0'
    data[idx]['APPLUS LAGER'] = '0'
    data[idx]['APPLUS FERTIGUNG'] = '1'
    data[idx]['APPLUS AUFTRAG'] = '1'


def load_data(filepath):
    data = []
    with open(filepath, newline='\n', encoding='utf-8-sig') as csvfile:
        spamreader = csv.DictReader(csvfile, delimiter=';', quotechar='|')
        for row in spamreader:
            data.append(row)
    return data


def convert():
    if filepath == '':
        mb.showerror("Keine Datei ausgewählt",
                     "Es wurde keine Datei zum Konvertieren ausgewählt. Bitte wählen Sie eine vorher aus.")
        return
    data = load_data(filepath)
    for row in data:
        row['APPLUS MENGE'] = int(row['APPLUS MENGE'])
        row['Wand ID'] = row['APPLUS WAND ID'].split(' ')[1]

        if row['APPLUS ARTIKELGRUPPE'] == 'Profil':
            row['APPLUS KLEINTEILMENGE'] = math.ceil(int(row['APPLUS KLEINTEILSCHLÜSSEL']) *
                                                     float(row['APPLUS PROFILLÄNGE'].replace(',', '.')) / 1000)
            pass
        elif row['APPLUS ARTIKELGRUPPE'] == 'Platte':
            row['APPLUS KLEINTEILMENGE'] = math.ceil(int(row['APPLUS KLEINTEILSCHLÜSSEL']) *
                                                     float(row['APPLUS FLÄCHE'].replace(',', '.')))
            pass
        elif row['APPLUS ARTIKELGRUPPE'] == 'Kleinteil':
            continue
        else:
            row['APPLUS KLEINTEILMENGE'] = math.ceil(int(row['APPLUS KLEINTEILSCHLÜSSEL']) *
                                                     int(row['APPLUS MENGE']))
            pass
        if row['APPLUS KLEINTEILMENGE'] > 0:
            data.append(
                get_row('4', row['APPLUS KLEINTEILBEZEICHNUNG'], row['Wand ID'], ap_wand_id=row['APPLUS WAND ID'], gruppe='Kleinteil', artikelnummer=row['APPLUS KLEINTEILARTIKELNUMMER'], menge=row['APPLUS KLEINTEILMENGE']))

    data = sorted(data, key=lambda x: (x['Wand ID'], x['APPLUS ARTIKELGRUPPE'],
                                       x['APPLUS ARTIKELNUMMER'], x['APPLUS PROFILLÄNGE'], x['APPLUS FLÄCHE']))
    for idx, row in enumerate(data):
        for i in range(idx + 1, len(data)-1):
            if i < len(data) and (row['Wand ID'], row['APPLUS ARTIKELGRUPPE'], row['APPLUS ARTIKELNUMMER'], row['APPLUS PROFILLÄNGE'], row['APPLUS FLÄCHE'], row['APPLUS LÄNGE'], row['APPLUS BREITE']) == \
                    (data[i]['Wand ID'], data[i]['APPLUS ARTIKELGRUPPE'], data[i]['APPLUS ARTIKELNUMMER'], data[i]['APPLUS PROFILLÄNGE'], data[i]['APPLUS FLÄCHE'], data[i]['APPLUS LÄNGE'], data[i]['APPLUS BREITE']):
                row['APPLUS MENGE'] += data[i]['APPLUS MENGE']
                del data[i]
            else:
                break

    for idx, row in enumerate(data):
        for i in range(idx + 1, len(data)-1):
            if i < len(data) and (row['Wand ID'], row['APPLUS ARTIKELNUMMER']) == (data[i]['Wand ID'], data[i]['APPLUS ARTIKELNUMMER']) and row['APPLUS ARTIKELGRUPPE'] == 'Dämmung' and data[i]['APPLUS ARTIKELGRUPPE'] == 'Dämmung':
                row['APPLUS FLÄCHE'] += data[i]['APPLUS FLÄCHE']
                del data[i]
            else:
                break
    wand_id = 0
    for idx, row in enumerate(data):
        if wand_id != row['Wand ID']:
            wand_id = row['Wand ID']
            data.insert(idx, get_row('2', "Wand " + wand_id, wand_id,
                        gruppe='kalk.pos.', einkauf='0', lager='0', fertigung='1', auftrag='1'))
    gruppe = ""
    for idx, row in enumerate(data):
        if row['APPLUS ARTIKELGRUPPE'] != gruppe and row['APPLUS EBENE'] == '4':
            gruppe = row['APPLUS ARTIKELGRUPPE']
            data.insert(idx, get_row('3', "Alle " + gruppe + " Wand " +
                        row['Wand ID'], row['Wand ID'], gruppe=gruppe, einkauf='0', lager='0', fertigung='1', auftrag='1'))

    data.insert(0, get_row('1', "Projekt " + input('Porjekttitel '), 0, einkauf='0',
                lager='0', fertigung='1', auftrag='1'))

    for idx, row in enumerate(data):
        if row['APPLUS EBENE'] == '4':
            match row['APPLUS ARTIKELGRUPPE']:
                case 'Platte':
                    plattesml(data, idx)
                    add_leading_zeros(data, idx, "APPLUS LÄNGE")
                    add_leading_zeros(data, idx, "APPLUS BREITE")
                    trim_str(data, idx, 'APPLUS FLÄCHE')
                    extend_description(data, idx, 'APPLUS BEZEICHNUNG')

                    if row['APPLUS FLÄCHE'] != row['APPLUS STANDARDFLÄCHE']:
                        artNr = cut(data, idx, 'APPLUS ARTIKELNUMMER')
                        menge = float(row['APPLUS FLÄCHE'])

                        fertigung_auftrag(data, idx)
                        row['APPLUS ARTIKELNUMMER'] = row['APPLUS BSU ID'] + row['APPLUS LÄNGE'] + \
                            row['APPLUS BREITE'] + \
                            row['APPLUS FLÄCHE'].replace('.', '')
                        data.insert(idx + 1, get_row('5', '', '',
                                    artikelnummer=artNr, menge=menge, me='M2'))
                    # print("Platte")
                case 'Profil':

                    if row['APPLUS PROFILLÄNGE'] != row['APPLUS STANDARDPROFILLÄNGE']:
                        artNr = cut(data, idx, 'APPLUS ARTIKELNUMMER')
                        menge = float(row['APPLUS PROFILLÄNGE'])
                        fertigung_auftrag(data, idx)
                        trim_str(data, idx, 'APPLUS PROFILLÄNGE')

                        row['APPLUS ARTIKELNUMMER'] = row['APPLUS BSU ID'] + row['APPLUS PROFILLÄNGE'].replace(
                            '.', '') + row['APPLUS STANDARDPROFILLÄNGE'] + row['APPLUS PROFILLÄNGE'].replace('.', '')
                        data.insert(idx + 1, get_row('5', '', '',
                                    artikelnummer=artNr, menge=menge, me='mm'))

                    continue
                    # print("Profil")
                case "Dämmung":
                    row['APPLUS MENGE'] = row['APPLUS FLÄCHE']
                    row['AAPLUS MENGENEINHEIT'] = 'M2'
                    row['AAPLUS EINKAUF'] = '1'
                    row['AAPLUS LAGER'] = '1'
                    row['AAPLUS FERTIGUNG'] = '0'
                    row['AAPLUS AUFTRAG'] = '0'

    fieldnames = ['APPLUS EBENE', 'APPLUS BEZEICHNUNG', 'APPLUS ARTIKELNUMMER', 'APPLUS MENGE', 'APPLUS MENGENEINHEIT', 'APPLUS ARTIKELGRUPPE', 'APPLUS PROFILLÄNGE', 'APPLUS FLÄCHE', 'APPLUS STANDARDPROFILLÄNGE', 'APPLUS STANDARDFLÄCHE',
                  'APPLUS EINKAUF', 'APPLUS LAGER', 'APPLUS FERTIGUNG', 'APPLUS AUFTRAG', 'APPLUS LÄNGE', 'APPLUS BREITE', 'APPLUS WAND ID', 'APPLUS KLEINTEILMENGE', 'APPLUS KLEINTEILBEZEICHNUNG', 'APPLUS KLEINTEILSCHLÜSSEL', 'APPLUS KLEINTEILARTIKELNUMMER', 'APPLUS BSU ID', 'Wand ID']
    with open(r'converted.csv', 'w', newline='\n', encoding='utf-8-sig') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter=',')
        writer.writeheader()

        writer.writerows(data)


filepath = ''
root = tkinter.Tk()

root.title("AP+ Converter")
# root.geometry('300x200')
root.configure(background='red')

# style configuration
style = ttk.Style(root)
style.configure('TLabel', background='black', foreground='white')
style.configure('TFrame', background='black')

frame = ttk.Frame(root)
frame.grid(column=0, row=0)


import_btn = ttk.Button(frame, text='Datei öffnen', command=select_file)
import_btn.grid(row=1)

convert_btn = ttk.Button(frame, text="Konvertieren", command=convert)
convert_btn.grid(row=2)

title_label = ttk.Label(frame, text="Projekttitel").grid(row=0, column=0)
project_title = ttk.Entry(frame)
project_title.grid(row=0)


if __name__ == '__main__':
    root.mainloop()
