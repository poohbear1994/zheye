
# ColumnList组件
```js
props: {
	columnList // 接收到专栏列表数据
}
import addColumnAvatar from 'helper.ts' // 为专栏列表数据添加avatar
```

如果遍历出的专栏数据里没有avatar数据，补充一个默认的avatar

# GlobalHeader组件
```js
components: {
	Dropdown
	DropdownItem
	createMessage // 函数式创建Message组件
}
props: {
	user: {
		isLogin: boolean;
		name?: string;
		id?: number;
	}
}
methods {
	handleLogout // 退出登陆事件
}
```

# Dropdown组件
```js
emits: [
	item-clicked // 下拉菜单选项被点击时需要执行的函数
]
props: {
	title: string // 下拉菜单按钮上的文字
}
method: {
	toggleOpen // 切换菜单是否展示
	handle // 当菜单显示时，点击菜单以外区域，隐藏菜单
	dropDownItemClicked // 下拉菜单选项被点击时要执行的事件
}
needLibrary: {
	mitt
}
```

# DropItem组件
```js
props: {
	disabled: boolean // 控制按钮是否可选
	closeAfterClick: boolean // 当该DropItem被点击后是否关闭dropdown组件
}
slots: {
	#default
}
methods {
	handleItemClick // 该DropItem的点击事件
}
需要Dropdown创建并且导出的mitt
```

# ValidateInput组件
```js
props: {
	rules: RulesProp[]
	modelValue: String	// 在该组件上双向绑定的值
	tag // 控制ValidateInput内部使用input标签还是textarea标签
},
data: {
	inputRef = reactive({
     	val: props.modelValue || ''
, // 双向获取输入框的值
      error: false, // 是否显示错误提示
      message: '' // 错误提示
   })
// 有get set，完美赋值给v-model
	const inputVal = computed({
		get: () => props.modelValue || '',
		set: val => {
			context.emit('update:modelValue', val)
		}
	)
}
method: {
	validateInput	// input失焦时，遍历rules，进行验证，当出现错误时，显示错误提示
}
inheritAttrs: false, // 关闭默认该组件外壳继承attrs
needLibrary: {
	mitt // 触发form-item-created事件，传递验证input验证方法给form表单
}
```
该组件在内部使用v-model双向绑定input输入框，而在别的组件或者页面内，使用该ValidateInput组件时，也可以使用v-model进行双向绑定，该组件内部的v-model的值改变时，会调用v-model下的set()，该set()内通过context.emit('update:modelValue', val)将变化后的值传递给使用ValidateInput组件的地方，那个地方就获取到了最新的input的value

# ValidateForm
```js
emits: {
	form-submit // 接收表单提交按钮触发时需要执行的事件
}
data: {
	funcArr // 存取ValidateInput的验证方法
}
methods: {
	submitForm // 表单提交按钮点击事件
	callback（funk） // form-item-created被触发时执行的事件，接收form-item-created被触发时传入的验证方法
}
slots: {
	#default
	#submit
}
needLibrary: {
	mitt // 监听form-item-created事件
}
```

# PostList组件
```js
props: {
	list // 接收文章列表数据
}
data: {
	posts // 保存文章列表数据
}
import { generateFitUrl } from '../helper' // 生成适配后的图片url
```

# Loader组件
```js
props: {
	text 	// loader组件显示的信息
	background	// 	loader组件的背景颜色
}
```

# Message组件
```js
emits: [
	close-message //关闭按钮被点击时需要执行的事件
]
props: {
	message // message组件要显示的信息
	type // message的样式类型（错误，成功，默认）
	classObject // message的样式对象，控制显示什么样子的该组件
}
data: {
	isVisible // Message的显示状态
}
methods: {
	hide // 点击关闭按钮时关闭message组件
}
needHooks: {
	useDOMCreate
}
函数式创建方法：createMessage
```

# Uploader组件
```js
emits: [
	file-uploaded // 文件上传成功的执行函数
	file-uploaded-error // 文件上传后发生错误时的执行函数
]
props: {
	action,
	beforeUpload, // 文件上传前的执行函数，这里使用props传递过来
	uploaded // 外界传入的上传数据
}
data: {
	fileStatus // 文件上传状态 'ready' | 'loading' | 'success' | 'error'
	uploadedData // 上传成功后返回的数据或外界传入的上传数据
}
methods: {
	handleFileChange // 需要上传的文件发生改变时的执行函数
	triggerUpload // 触发input的点击事件，该组件隐藏了input框，使用上传button进行上传
}
inheritAttrs: false,
slots: {
	#loading
	#uploaded
}
needLibrary: {
	axios
}
```

# UserProfile组件
```js
props: {
	user // 用户数据
}
data: {
	fitUrl // avatar的url处理
}
import { addColumnAvatar } from '../helper'

```

# Modal组件
```js
props {
	content
	title
	visible: boolean // 控制Modal是否显示
}
emits: [
	modal-on-close // 点击关闭按钮时执行的函数
	modal-on-confirm // 点击确认按钮时执行的函数
]
methods: {
	onClose // 关闭事件
	onConfirm	// 确认事件
}
needHooks: {
	useDOMCreate
}
```

# Home页
```js
components: {
	ColumnList
}
data: {
	list // 专栏列表数据
}
import { objToArr } from '../helper'
```

# Login页
```js
components: {
	ValidateForm,
	ValidateInput
	createMessage // 函数式创建Message组件
}
data: {
	emailVal // 邮箱动态值
	emailRules	// 传递给ValidateInput的邮箱验证规则
	passwordVal	// 密码动态值
	passwordRules	// 传递给ValidateInput的密码验证规则
}
method: {
	onFormSubmit // 传递给ValidateForm组件的表单验证事件
}
```

# Signup页
```js
components: {
	ValidateInput
	ValidateForm
}
data: {
	formData // 表单数据
	emailRules // 邮箱验证规则
	nameRules // 昵称验证规则
	passwordRules // 密码验证规则
	repeatPasswordRules // 密码重复验证规则
}
methods: {
	onFormSubmit // 传递给ValidateForm的表单提交时要执行的函数
}
```


# ColumnDetail页
```js
components: {
	PostList
}
data: {
	currentId // 路由传递过来的columnID
	column // 专栏数据
	list // 文章列表数据
}
import addColumnAvatar from 'helper.ts'
```

# CreatePost页
```js
components: {
	ValidateInput,
	ValidateForm,
	Uploader,
	createMessage // 函数式创建Message组件
}
data: {
	uploadedData // 文章上传数据
	titleVal // 标题的双向绑定数据
	titleRules	// 标题的验证规则
	contentVal	// 内容的双向绑定数据
	contentRules	// 内容的验证规则
	column // 获取创建作者的专栏数据
	imageId // 保存文件上传成功后响应返回的图片ID
	isEditMode // 是否是编辑模式
}
methods: {
	onFormSubmit	// 传递给ValidateForm的表单提交时的执行函数
	handleFileUploaded // 文件上传成功后的执行函数
	uploadCheck //文件上传前的格式大小检查函数
}
import beforeUploadCheck from 'helper.ts'
```

# PostDetail页
```js
components: {
	UserProfile
	Modal
	createMessage
}
data: {
	currentId // 路由传递过来的postID
	currentPost // 获取当前post数据
	currentHTML // 获取当前文章转化为HTML后的数据
	currentImageUrl // 当前文章的图片url
	md // markdown的处理对象
	showEditArea // 是否展示编辑按钮区域
	modalIsVisible // 控制Modal组件是否显示
}
methods: {
	hideAndDelete // 隐藏Modal组件与删除文章事件
}
needLibrary: {
	markdown-it
}
```

# APP页
```js
components: {
	GlobalHeader,
	Loader,
	createMessage // 函数式创建message组件
}
data: {
	currentUser // 获取当前用户数据
	isLoading // 控制是否显示Loader组件
	error // 获取错误
}
needLibrary: {
	axios
}
```