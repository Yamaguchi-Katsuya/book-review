export type User = {
  name: string
  iconUrl: string
}

export type SignUpApiRequest = {
  name: string
  email: string
  password: string
}

export type SignUpApiResponse = {
  token: string
}

export type LoginApiRequest = {
  email: string
  password: string
}

export type LoginApiResponse = {
  token: string
}

export type IconUploadApiRequest = {
  icon: File
}

export type IconUploadApiResponse = {
  iconUrl: string
}
