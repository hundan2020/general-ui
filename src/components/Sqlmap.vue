<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <h1>SQLMAP</h1>
      </el-col>
    </el-row>
    <el-row>
      <h3>检测源</h3>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="22" >
        <el-row>
          <el-col>
            <el-radio-group v-model="radio1">
                  <el-radio-button label="URL">网址</el-radio-button>
                  <el-radio-button label="DIRECT">数据库直连</el-radio-button>
                  <el-radio-button label="LOGFILE">代理日志</el-radio-button>
                  <el-radio-button label="SITEMAPURL">sitemap.xml</el-radio-button>
                  <el-radio-button label="BULKFILE">网址列表</el-radio-button>
                  <el-radio-button label="REQUESTFILE">请求数据包</el-radio-button>
                  <el-radio-button label="GOOGLEDORK">谷歌搜索</el-radio-button>
                  <el-radio-button label="CONFIGFILE">配置文件</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20" v-show="radio1 == 'URL'">
        <el-input v-model="u">
          <template slot="prepend">网址</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'DIRECT'">
        <el-input v-model="u">
          <template slot="prepend">数据库直连</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'LOGFILE'">
        <el-input v-model="u">
          <template slot="prepend">代理日志</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'SITEMAPURL'">
        <el-input v-model="u">
          <template slot="prepend">sitemap.xml</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'BULKFILE'">
        <el-input v-model="u">
          <template slot="prepend">网址列表</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'REQUESTFILE'">
        <el-input v-model="u">
          <template slot="prepend">请求数据包</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'GOOGLEDORK'">
        <el-input v-model="u">
          <template slot="prepend">谷歌搜索</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'CONFIGFILE'">
        <el-input v-model="u">
          <template slot="prepend">配置文件</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <h3>请求参数</h3>
    </el-row>
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4, offset: 2}" :span="6">
        请求方法：<el-select v-model="method" filterable allow-create placeholder="请选择">
            <el-option
              v-for="item in methods"
              :key="item.method"
              :label="item.label"
              :value="item.method">
            </el-option>
          </el-select>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 12}" :span="6">
        请求Body：<el-input type="textarea" v-model="data" placeholder="id=1"></el-input>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4}" :span="6">
        参数分割符：<el-input v-model="param_del" placeholder="& "></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-switch v-model="cookie_switch" active-color="#409EFF" inactive-color="#13ce66" active-text="从文件读取Cookie" inactive-text="手动输入Cookie">
        </el-switch>
      </el-col>
    </el-row>
    <el-row v-show="!cookie_switch">
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 16, offset: 2}">
        Cookie：<el-input v-model="cookie" placeholder="BAIDUID=D2A966A2F498:FG=1; PSTM=1561538922; BIDUPSID=32239B1ACFBA26; MCITY=-3; BDUSS=mRjY35tWDBCYlZ5TmstUnJwNklkdWd1WENLbnpTdGlCYXV5SHM0dHNSUXU2V0ZkRVFBQUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5cOl0uXDpdU;"></el-input>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4}">
        分割符：<el-input v-model="cookie_del" placeholder=";"></el-input>
      </el-col>
    </el-row>
    <el-row v-show="cookie_switch">
      <el-col :offset="2" :span="20">
        从文件读取Cookie：<el-input v-model="load_cookies" placeholder="C:\Users\MECHREVO\Desktop\Pentest Logs\hundan.org\Cookie.log"></el-input>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :sm="{offset: 2, span: 20}" :xs="{offset: 2, span: 20}">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}" :span="2">
            <el-switch v-model="drop_set_cookie" active-text="忽略Set-Cookie" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(0)" v-model="mobile" active-text="伪装手机" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(1)" v-model="random_agent" active-text="随机UA" ></el-switch>
          </el-col>
          <el-col class="aleft" :xs="{span: 12}" :sm="{span: 7}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(2)" v-model="user_agent_switch" active-text="指定UA" ></el-switch>
          </el-col>
          <el-col class="aleft" :xs="{span: 24}" :sm="{span: 17}" :md="{span: 10}" :span="10">
            <el-input v-model="user_agent" :disabled="!user_agent_switch" placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定host
            <el-input v-model="host" placeholder="hundan.org"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定referer
            <el-input v-model="referer" placeholder="https://hundan.org/"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定headers
            <el-input
            type="textarea"
            :rows="3"
            placeholder="Accept-Language: fr
X-Forwarded-For: 127.0.0.1
ETag: 123"
                  ></el-input>
                </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询验证方式
            <el-select v-model="auth_type" filterable placeholder="请选择">
                <el-option
                  v-for="item in auth_types"
                  :key="item.auth_type"
                  :label="item.label"
                  :value="item.auth_type">
                </el-option>
              </el-select>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询账号密码
            <el-input v-model="test" placeholder="username:password"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询PEM文件
            <el-input v-model="test" placeholder="C:\Users\MECHREVO\Desktop\Pentest Logs\hundan.org\hundan.org.pem">
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 10}" :sm="{span: 5}" :md="{span: 5}" :span="2">
            忽略http错误代码
            <el-input v-model="ignore_code" placeholder="500"></el-input>
          </el-col>
          <el-col :xs="{span: 7}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            每次请求延时
            <el-input v-model="delay" placeholder="5">
              <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 7}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            最大超时时间
            <el-input v-model="test" placeholder="30">
              <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 10}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            最大超时重试
            <el-input v-model="test" placeholder="3">
              <template slot="append">次</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 14}" :sm="{span: 4}" :md="{span: 7}" :span="2">
            参数随机填充
            <el-input v-model="test" placeholder="id;event;target;param3;...">
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 2}" :span="3">
            <el-switch v-model="ignore_proxy" active-text="禁用系统代理" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 2}" :span="3">
            <el-switch v-model="test" active-text="忽略重定向" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 2}" :span="3">
            <el-switch v-model="test" active-text="忽略连接超时" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 2}" :span="3">
            <el-switch v-model="test" active-text="使用https" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="test" active-text="使用chunked传输" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 5}" :xl="{span: 2}" :span="3">
            <el-switch v-model="test" active-text="使用hpp技术" ></el-switch>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 4}" :span="3">
            <el-switch v-model="test" active-text="对payload进行url编码" ></el-switch>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>检测性能优化</h3>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 7}" :span="3">
            <el-switch active-text="开启所有优化参数" active-value=""></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 5}" :span="3">
            <el-switch active-text="预加载"></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 6}" :span="3">
            <el-switch active-text="http keep-alive"></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 6}" :span="3">
            <el-switch active-text="只看返回包长度" active-value="null-connection"></el-switch>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row id="example-3">
      <el-col :offset="2" :span="6">
        数据库类型：<el-select v-model="dbms" filterable placeholder="请选择">
            <el-option
              v-for="item in dbmss"
              :key="item.dbms"
              :label="item.label"
              :value="item.dbms">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-input v-model="command">
          <template slot="prepend">运行</template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    ua_mobile_conflict (ref) {
      switch (ref) {
        case 0:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.random_agent = false
            this.$data.user_agent_switch = false
          }
          break
        case 1:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.mobile = false
            this.$data.user_agent_switch = false
          }
          break
        case 2:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.mobile = false
            this.$data.random_agent = false
          }
      }
    }
  },
  data () {
    return {
      radio1: 'URL',
      auth_types: [{
        auth_type: '0',
        label: '无401质询'
      }, {
        auth_type: 'Basic',
        label: 'Basic'
      }, {
        auth_type: 'Digest',
        label: 'Digest'
      }, {
        auth_type: 'NTLM',
        label: 'NTLM'
      }, {
        auth_type: 'PKI',
        label: 'PKI'
      }],
      auth_type: '0',
      methods: [{
        method: 'GET',
        label: 'GET'
      }, {
        method: 'POST',
        label: 'POST'
      }, {
        method: 'HEAD',
        label: 'HEAD'
      }, {
        method: 'PUT',
        label: 'PUT'
      }, {
        method: 'CONNECT',
        label: 'CONNECT'
      }, {
        method: 'TRACE',
        label: 'TRACE'
      }, {
        method: 'PATCH',
        label: 'PATCH'
      }, {
        method: 'DELETE',
        label: 'DELETE'
      }, {
        method: 'OPTIONS',
        label: 'OPTIONS'
      }, {
        method: 'MOVE',
        label: 'MOVE'
      }],
      method: 'GET',
      dbmss: [{
        dbms: '0',
        label: '自动探测'
      }, {
        dbms: 'mssql',
        label: 'mssql'
      }, {
        dbms: 'mysql',
        label: 'mysql'
      }, {
        dbms: 'mysql 4',
        label: 'mysql 4'
      }, {
        dbms: 'mysql 5',
        label: 'mysql 5'
      }, {
        dbms: 'oracle',
        label: 'oracle'
      }, {
        dbms: 'pgsql',
        label: 'pgsql'
      }, {
        dbms: 'sqlite',
        label: 'sqlite'
      }, {
        dbms: 'sqlite3',
        label: 'sqlite3'
      }, {
        dbms: 'access',
        label: 'access'
      }, {
        dbms: 'firebird',
        label: 'firebird'
      }, {
        dbms: 'maxdb',
        label: 'maxdb'
      }, {
        dbms: 'sybase',
        label: 'sybase'
      }],
      dbms: '0',
      u: '',
      command: '',
      test: '',
      data: '',
      param_del: '',
      cookie: '',
      cookie_del: '',
      load_cookies: '',
      cookie_switch: false,
      drop_set_cookie: false,
      mobile: false,
      user_agent: '',
      user_agent_switch: false,
      random_agent: false,
      host: '',
      referer: '',
      ignore_code: '',
      ignore_proxy: false,
      delay: null
    }
  }
}
</script>

<style scoped>
  .el-switch {
    /* padding-top: 30px; */
  }
  .el-input-number {
    width: 100%;
  }
  .el-select {
    display: block;
  }
  .hide {
    height: 1px;
  }
  .el-row {
    transition-delay: .5s;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .aleft {
    text-align: left;
  }
</style>
