export const parseKebab = (str: string, to: "kebab" | "spaced") => {
  if (!str) return ""

  if (to === "spaced") {
    const spaced = str.replace(/-/g, " ")

    return spaced.charAt(0).toUpperCase() + spaced.slice(1)
  } else {
    return str
      .trim() // Remove leading/trailing spaces
      .toLowerCase() // Convert the whole string to lowercase
      .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
      .replace(/[^a-z0-9-]/g, "")
  }
}
