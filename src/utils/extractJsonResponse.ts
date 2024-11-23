export function extractJsonObjects(data: string): any[] {
  const jsonObjects: any[] = [];
  const regex = /{[^{}]*}/g; // Ajusta el regex para tu caso específico si es necesario
  let match;

  while ((match = regex.exec(data)) !== null) {
    try {
      const jsonObject = JSON.parse(match[0]);
      jsonObjects.push(jsonObject);
    } catch (e) {
      console.error("Error parsing JSON:", match[0], e);
    }
  }

  return jsonObjects;
}
