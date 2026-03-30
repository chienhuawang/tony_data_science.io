import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            paragraphs = tree.findall('.//w:p', ns)
            text = []
            for p in paragraphs:
                run_texts = [node.text for node in p.findall('.//w:t', ns) if node.text]
                if run_texts:
                    text.append(''.join(run_texts))
            return '\n'.join(text)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    path = r"d:\NovusAgentic.ai\tony_data_science.io\docs\ChienHua Wang Resume.docx"
    content = extract_text_from_docx(path)
    with open('extracted_resume.txt', 'w', encoding='utf-8') as f:
        f.write(content)
