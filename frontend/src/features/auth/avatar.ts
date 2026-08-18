export const avatarTypes = [
  { label: "Adventurer", value: "adventurer" },
  { label: "Avataaars", value: "avataaars" },
  { label: "Big Ears", value: "big-ears" },
  { label: "Bottts", value: "croodles" },
  { label: "Lorelei", value: "lorelei" },
  { label: "Notionists", value: "notionists" },
  { label: "Pixel Art", value: "pixel-art" },
] as const

export const avatarValues = avatarTypes.map((item) => item.value)
export const avatarLabels = avatarTypes.map((item) => item.label)

export type AvatarType = (typeof avatarTypes)[number]["value"]

export const getAvatarUrl = (
  username: string,
  type: AvatarType | string,
  neutral: boolean = false
) => {
  console.log(type)
  const avatarType = neutral ? `${type}-neutral` : type

  return `https://api.dicebear.com/10.x/${avatarType}/svg?seed=${encodeURIComponent(username)}`
}
