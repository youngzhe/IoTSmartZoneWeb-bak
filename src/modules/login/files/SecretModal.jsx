/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Modal } from 'antd'
import style from '../login.module.less'

function Element(props) {
  const { onCancel } = props

  return (
    <Modal visible title='隐私政策' onCancel={onCancel} footer={null} width={800}>
      <div className={style.fileModal}>
        <p>
          本隐私政策和法律声明协议（“本协议”）由您（以下称“您”或“用户”或“企业用户”）与【BOE（京东方）园区运营管理平台系统】（“系统”）的运营者【京东方智慧物联科技有限公司】（“我们”或“BOE”）缔结。我们知晓隐私对客户及其员工的重要性，本协议主要明确我们如何收集、使用、保存、处理您的个人信息，我们将遵守中国大陆有关隐私的法律法规规定保护您的个人信息安全。
        </p>
        <p>
          本协议可能不时修改，以适应相关法律的修改或出台以及我们在服务方面做出的改善。我们将向您公布最新版本，请您谨慎阅读。若您继续使用系统，视为同意最新版本的规定。
        </p>
        <p>
          您同意本协议及其他规则的方式包括但不限于：(1)通过点击“我同意”或者其他方式接受；(2)通过电子邮件、电话等方式所做的口头或书面表示；(3)本协议及其他规则（包括但不限于服务说明及使用帮助等）中有“默认同意”条款，您点击同意或以其他形式实际使用我们的服务的；(4)其他您与我们均认可的方式。
        </p>
        <p>1.隐私政策</p>
        <p>1.1我们收集哪些信息</p>
        <p>
          （1）本系统在注册的环节需要输入【用户名、邮箱、联系号码】。收集前述信息的目的在于明确系统指定的联系人，以便我们在提供售后服务中出现问题或者您存在违规违法行为时及时与您取得联系。
        </p>
        <p>（2）我们可能从您所在的企业取得您的【姓名、邮箱、联系号码】，以便确定系统使用过程中双方联系人员。</p>
        <p>
          （3）考虑到系统具有多个终端设备需要控制，您可能需要开通多个子账户，届时您需要向我们提供控制各终端设备的联系人（即“系统用户”）信息，具体包括姓氏、邮箱和联系号码。我们在此特别提示，您事前应从该等人员处取得授权后，以匿名化形式提供给我们。
        </p>
        <p>1.2我们如何使用信息</p>
        <p>您在此同意我们在下列情况下使用您的信息：</p>
        <p>（1）在使用系统服务过程中出现问题需要提供售后服务，与您取得联系、了解情况并予以解答；。</p>
        <p>（2）若您存在违规违法行为时，我们将立即通知您并采取必要措施，届时将影响您的正常使用；</p>
        <p>
          （3）征求您对我们产品和服务的意见并进行回访、调研，以便我们根据您反馈的意见和建议改进系统和/或系统适配的硬件体验；
        </p>
        <p>（4）按照法律法规规定使用您的信息。</p>
        <p>除了上述情况外，我们将取得您的授权同意情况下，方会使用您的信息。</p>
        <p>1.3我们如何共享和披露信息</p>
        <p>我们不会与我们以外的任何公司、组织和个人共享、转让、披露您的信息，但以下情况除外：</p>
        <p>
          （1）我们会将您提供给我们的信息以匿名化的方式发送给支持我们业务的第三方服务提供商或合作伙伴，以便该第三方服务商或合作伙伴联系您和/或您所在企业从而提供系统相关的服务（如云存储和云服务）；
        </p>
        <p>（2）根据中国大陆的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供；</p>
        <p>（3）事前获得您明确的同意或授权；</p>
        <p>（4）基于符合法律法规的社会公共利益而使用。</p>
        <p>1.4我们如何保护信息</p>
        <p>
          （1）请您知悉，我们已采取合理的物理、技术措施，将尽力确保或担保您发送给我们的任何信息的安全性，但在互联网环境下，没有网站、互联网传输、计算机系统或无线连接是完全安全的。
        </p>
        <p>
          （2）我们采取合理措施，确保我们仅在收集您的信息的目的需要的时间内，或根据法律法规要求的期限，保留您的信息。
        </p>
        <p>1.5我们如何转移个人信息</p>
        <p>我们不会将您的信息转移给任何公司、组织和个人，但以下情况除外：</p>
        <p>（1）事先获得您明确的同意或授权；</p>
        <p>（2）根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况进行提供；</p>
        <p>
          （3）在涉及合并、收购、资产转让或类似的交易时，如涉及到信息转让，我们会要求新的持有您信息的公司、组织继续受本隐私政策的约束，否则，我们将要求该公司、组织重新向您征求授权同意。
        </p>
        <p>2.法律声明</p>
        <p>2.1知识产权声明</p>
        <p>
          我们及我们的关联公司对于网站、系统享有完整的知识产权，您不得以任何形式进行侵犯，否则我们将依法追究您的法律责任。
        </p>
        <p>2.2法律声明</p>
        <p>
          我们仅提供系统服务，系统适配的硬件展示的内容由您自行提供，请您在上传前对内容进行审查，确认内容的权属并保证内容的合法合规。若我们发现您终端设备展示的内容出现侵权或存在其他问题将尽快通知您，您将需要提供不侵权或其他合法合规证明等，若您不能提供，我们将对相关内容做删除处理或者在法律允许的最大限度内采取其他措施。若展示的内容存在明显违法的（如涉嫌黄赌毒），我们将立即删除处理或者采取在法律允许的最大限度内采取其他措施。
        </p>
        <p>2.3服务声明</p>
        <p>
          由于行业高速发展和立法完善，现有的约定不能保证完全满足未来发展的需求，我们可能不时修订本协议中的条款和/或“系统”中的服务规则，届时我们将以平台公告等形式告知您，必要时可能会要求您重新认证，修订后的版本将自动取代修订前的版本，请您保持关注“系统”中的条款。若您不同意修订后的本协议下的全部或部分内容，请您立即停止使用“系统”服务。
        </p>
        <p>3.违约和赔偿</p>
        <p>
          3.1请您尊重我们以及任何第三方的所有权和知识产权，若我们有合理证据证明您存在侵权行为，我们有权主张您的侵权责任。同时，您应全额赔偿我们因您的侵权行为所遭受的损失，包括但不限于仲裁费、诉讼费、律师费、差旅费及我们因此支出的全部合理费用。
        </p>
        <p>
          3.2您理解并同意，我们有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。
        </p>
        <p>
          3.3您理解并同意，我们有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。
        </p>
        <p>
          3.4对于您实施的违约行为、侵权行为、违法行为导致我们或者第三方遭受索赔、损失、损害、责任、成本、费用（包括但不限于律师费）等，您应对此承担全部赔偿责任。若您的行为给您的企业或第三方遭致损失，我们将协助受损方提供相关证明。
        </p>
        <p>
          3.5在法律法规允许的最大范围内，我们仅就本协议所述服务向您承担责任，且所承担的赔偿责任应以我们向您提供具体服务所收取的服务费的一（1）倍为限。此外，我们和我们的关联公司独立承担责任。
        </p>
        <p>
          3.6除非法律另有强制性规定，我们对您的赔偿仅限于直接损失，不包括间接损失、偶然损失、特别损失、结果损失、惩罚性损失、附带损失、商誉损失、利润损失等。
        </p>
        <p>4.通讯</p>
        <p>
          4.1您提供的联系地址、电子邮箱等对于提供服务以及纠纷文书送达等具有重要意义。请您确保您的联系地址和电子邮箱是有效的，请您不定时查收您的电子邮箱并阅读我们不时发送给您的信息。
        </p>
        <p>
          4.2若我们向您的联络地址发送纸质版本的文件，则我们邮寄后的第三日视为送达；若我们向您的电子邮箱或“系统”站内信，账户发送信息的，我们发送成功后视为送达。
        </p>
        <p>4.3若您提供的联系地址、电子邮箱存在错误、遗漏等导致无法送达，请您自行承担由此产生的后果和责任。</p>
        <p>5.争议解决</p>
        <p>
          如双方就本协议的内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均向北京仲裁委员会依照其届时有效的仲裁规则仲裁解决。仲裁裁决为终局的，对双方具有拘束力。
        </p>
        <p>本协议自【2020】年【9】月【1】日</p>
      </div>
    </Modal>
  )
}

export default React.memo(Element)