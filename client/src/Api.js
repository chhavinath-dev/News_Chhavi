const port= "http://localhost:5000"
export const loginAPI=`${port}/api/auth/login`;
export const registerAPI=`${port}/api/auth/createUser`
export const UpdateProfileAPI= `${port}/api/profile/UpdateUser`
export const DeleteProfileAPI= `${port}/api/profile/deleteUser`
export const GetProfile= `${port}/api/profile/Userprofile`
export const FetchAllNews= `${port}/api/getnews/fetchAllNews`
export const PostNewsAPI= `${port}/api/news/postnews`;
export const followAPI=`${port}/api/profile/follows`
export const unFollowAPI= `${port}/api/profile/unfollows` 
export const ConnectionInfoAPI= `${port}/api/profile/ConnectionInfo`
export const UserInfoAPI= `${port}/api/profile/UserInfo`
export const ForYouAPI= `${port}/api/getnews/ForYou`
export const LikePostAPI= `${port}/api/news/like` 
export const DisLikePostAPI= `${port}/api/news/dislike` 
export const deleteNewsAPI=  `${port}/api/news/deletenews`;
export const UpdateNewsAPI=  `${port}/api/news/updatenews`;


